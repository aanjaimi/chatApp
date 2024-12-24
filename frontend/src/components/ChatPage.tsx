import React from "react";
import type { User } from "@/app/types";
import { useMultiChatLogic } from "react-chat-engine-advanced";
import { PrettyChatWindow } from "react-chat-engine-pretty";

type ChatPageProps = {
  user: User;
};

const ChatPage = (props: ChatPageProps) => {
  const chatProps = useMultiChatLogic(
    process.env.CHAT_ENGINE_PROJECT_ID!,
    props.user.username,
    props.user.secret
  );
  return (
    <div className="w-full h-full">
      <PrettyChatWindow {...chatProps} style={{  }}/>
    </div>
  );
};

export default ChatPage;
