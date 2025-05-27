"use server";

import { auth } from "@/auth";
import { revalidateTag } from "next/cache";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL ?? "";

export const askChatAiBot = async ({
  companyId,
  question,
}: {
  companyId: string;
  question: string;
}) => {
  const session = await auth();

  if (session?.user?.accessToken) {
    try {
      const res = await fetch(`${baseUrl}/chat`, {
        method: "POST",
        next: { revalidate: 3600, tags: ["chats"] },
        headers: {
          Authorization: `Bearer ${session.user.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          company_id: companyId,
          question,
        }),
      });

      if (!res.ok) {
        throw new Error("failed to get LLM response");
      }

      revalidateTag("chats");
      return res.json();
    } catch (err) {
      console.error(err);
      throw new Error("failed to fetch data");
    }
  }
};

export const fetchChatsData = async ({ companyId }: { companyId: string }) => {
  const session = await auth();

  if (session?.user?.accessToken) {
    const res = await fetch(`${baseUrl}/chat/${companyId}`, {
      next: { revalidate: 3600, tags: ["chats"] },
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
        "Content-Type": "application/json",
      },
    });

    let data = [];

    if (res.ok) {
      data = await res.json();
    }

    return data;
  }
};
