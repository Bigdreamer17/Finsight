import { fetchChatsData } from "@/app/lib/fetchs/get-chat";
import ChatBotContainer from "./ChatBotContainer";
import type { companyIdType } from "./company/common/types";

const ChatBot = async ({ companyId }: companyIdType) => {
  const chatsData = await fetchChatsData({ companyId });

  return <ChatBotContainer chatsData={chatsData} companyId={companyId} />;
};

export default ChatBot;
