"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { RiChatAiLine } from "react-icons/ri";
import type { chatBotProps, chatType } from "./types";
import { format } from "date-fns";
import Image from "next/image";
import { IoIosCloseCircleOutline, IoIosSend } from "react-icons/io";
import { useSession } from "next-auth/react";
import { askChatAiBot } from "@/app/lib/fetchs/get-chat";
import ThreeDotsLoading from "./ThreeDotsLoading";
import ReactMarkdown from "react-markdown";
import { FaCheck, FaCopy } from "react-icons/fa6";

const ChatBotContainer = ({ chatsData, companyId }: chatBotProps) => {
  const pathName = usePathname().split("/");

  const { data: session } = useSession();

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [promptValue, setPromptValue] = useState("");
  const [copied, setCopied] = useState(false);
  const [latestResponse, setLatestResponse] = useState<{
    chat: string;
    sender: "bot";
  } | null>(null);
  const [displayedResponse, setDisplayedResponse] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  const [chatsDataFinal, setChatsDataFinal] = useState<chatType[]>(chatsData);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTo({
        top: ref.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [isChatOpen, chatsDataFinal]);

  useEffect(() => {
    if (
      typeof latestResponse?.chat !== "string" ||
      latestResponse.chat.trim() === ""
    )
      return;

    setDisplayedResponse("");
    let index = 0;

    const interval = setInterval(() => {
      if (index >= latestResponse.chat.length) {
        clearInterval(interval);
        return;
      }

      const char = latestResponse.chat[index];
      if (typeof char === "string") {
        setDisplayedResponse((prev) => prev + char);
      }

      index++;
    }, 5);

    return () => clearInterval(interval);
  }, [latestResponse?.chat]);

  const chatsByDate = chatsDataFinal.reduce<Record<string, chatType[]>>(
    (acc, chat) => {
      const dateKey = format(new Date(chat.created_at), "MMMM d, yyyy");
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(chat);
      return acc;
    },
    {},
  );

  const handleChatIsOpen = () => {
    setIsChatOpen((prev) => !prev);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setPromptValue("");

    const newChat: chatType = {
      user_id: session?.user?.id ?? "",
      company_id: companyId,
      chat: prompt,
      sender: "user",
      created_at: new Date(),
    };

    setChatsDataFinal((prev) => [...prev, newChat]);

    try {
      const response = await askChatAiBot({
        companyId: companyId,
        question: prompt,
      });
      setPrompt("");

      const newResponse: { chat: string; sender: "bot" } = {
        chat: response,
        sender: "bot",
      };

      setLatestResponse(newResponse);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2s
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div
      className={`${pathName[pathName.length - 1] === "dashboard" ? "hidden" : "fixed bottom-7 right-7 z-50 grid place-items-center"}`}
    >
      <>
        {isChatOpen && (
          <div className="w-[90%] sm:w-96 h-[80svh] rounded-2xl z-10 absolute bottom-full mb-2 -right-[2px] shadow-xl bg-[#2C2C35] border-[0.5px] border-[#AFAFB6]/40">
            <div className="h-12 flex justify-between bg-[#40404f] text-white w-full rounded-t-2xl p-3">
              <div className="flex gap-2">
                <Image
                  width={200}
                  height={200}
                  className="w-4 h-4 sm:h-6 sm:w-6 md:w-7 md:h-7 rounded-full self-end"
                  src="https://finchat.io/cdn-cgi/image/width=64,quality=100/assets/finchat-logos/finchat-icon-dark.png"
                  alt="Finsight assistant avatar"
                />
                Finsight Assistant
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                className="self-center float-right hover:cursor-pointer focus:outline-none"
              >
                <IoIosCloseCircleOutline size={25} />
              </button>
            </div>
            <div className="h-[80%] w-full bg-[#1C1C21] text-sm">
              <div
                ref={ref}
                className="flex flex-col gap-2 h-[99%] overflow-y-auto p-3 no-scrollbar"
              >
                {chatsData.length < 1 && (
                  <div className="grid place-items-center px-10 py-5 border-dashed border rounded-xl">
                    <div className="px-5 py-3 text-center">
                      Hello{" "}
                      {session?.user && session?.user.name
                        ? `${session?.user.name}`
                        : "there"}{" "}
                      <br /> Welcome to Finsight Assistant. How can I help you
                      today?
                    </div>
                  </div>
                )}
                {Object.keys(chatsByDate).map((date, index) => (
                  <div key={index}>
                    <div className="text-center text-xs text-gray-500 mb-2">
                      {date}
                    </div>
                    {chatsByDate[date].map((message, msgIndex) => (
                      <div key={msgIndex}>
                        {message.sender === "user" ? (
                          <div className="flex flex-row-reverse gap-2 my-2">
                            <div className="text-sm text-white bg-[#40404F] px-5 py-3 rounded-t-2xl rounded-l-2xl shadow-md max-w-11/12">
                              {message.chat}
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="flex gap-2 my-2">
                              <div className="relative max-w-11/12 overflow-clip rounded-tr-2xl">
                                <div className="text-sm bg-[#2C2C35] rounded-t-2xl rounded-r-2xl prose shadow-md">
                                  <div className="w-full bg-[#585868] h-[27px] absolute top-0"></div>
                                  <button
                                    onClick={async () =>
                                      await handleCopy(message.chat)
                                    }
                                    className="sticky text-xs -top-3 left-full p-1.5 bg-[#585868] flex items-center gap-2 hover:cursor-pointer focus:outline-none"
                                  >
                                    {copied ? (
                                      <FaCheck size={15} color="#27AA43" />
                                    ) : (
                                      <FaCopy size={15} color="#27AA43" />
                                    )}
                                  </button>

                                  <div className="px-4 py-2">
                                    <ReactMarkdown>
                                      {message.chat}
                                    </ReactMarkdown>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
                {latestResponse?.chat && (
                  <div className="flex gap-2">
                    <div className="relative max-w-11/12 overflow-clip rounded-tr-2xl">
                      <div className="text-sm bg-[#2C2C35] rounded-t-2xl rounded-r-2xl prose shadow-md">
                        <div className="w-full bg-[#585868] h-[27px] absolute top-0"></div>
                        <button
                          onClick={async () =>
                            await handleCopy(latestResponse.chat)
                          }
                          className="sticky text-xs -top-3 left-full p-1.5 bg-[#40404F] flex items-center gap-2 hover:cursor-pointer focus:outline-none"
                        >
                          {copied ? (
                            <FaCheck size={15} color="#27AA43" />
                          ) : (
                            <FaCopy size={15} color="#27AA43" />
                          )}
                        </button>

                        <div className="px-5 pb-2">
                          <ReactMarkdown>{displayedResponse}</ReactMarkdown>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {isLoading && (
                  <div className="flex gap-2">
                    <div className="bg-tertiary px-5 py-4 rounded-t-3xl rounded-r-3xl">
                      <ThreeDotsLoading />
                    </div>
                  </div>
                )}
              </div>
              <form
                onSubmit={handleSubmit}
                className="flex gap-1 mt-3 mb-1 px-3"
              >
                <input
                  type="text"
                  placeholder="Ask a question..."
                  value={promptValue}
                  onChange={(e) => {
                    setPrompt(e.target.value);
                    setPromptValue(e.target.value);
                  }}
                  className="w-full p-2 rounded-xl border border-gray-300 focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-[#27AA43] text-white p-2 rounded-xl hover:cursor-pointer focus:outline-none"
                >
                  <IoIosSend size={25} />
                </button>
              </form>
            </div>
          </div>
        )}
      </>
      <button
        className={`p-3 rounded-full bg-[#27AA43] hover:cursor-pointer focus:outline-none ${!isChatOpen ? "scaling-element" : ""}`}
        onClick={handleChatIsOpen}
      >
        <RiChatAiLine size={32} />
      </button>
    </div>
  );
};

export default ChatBotContainer;
