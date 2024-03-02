"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";

// Import a loading component to show while ChatEngine is loading
const Loading = () => <div>Loading...</div>;

const ChatEngine = dynamic(
  () => import("react-chat-engine").then((module) => module.ChatEngine),
  { loading: () => <Loading /> }
);
const MessageFormSocial = dynamic(
  () => import("react-chat-engine").then((module) => module.MessageFormSocial),
  { loading: () => <Loading /> }
);

export default function Chats() {
  const [showChat, setShowChat] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    setShowChat(true);
  }, []);

  if (!showChat) return <div />;

  return (
    <div className="background">
      <div className="shadow">
        <ChatEngine
          height="calc(100ch - 200px)"
          projectID="0d2ad53f-edd7-4271-bcb2-a9196ff9c773"
          username={searchParams.get("username")}
          userSecret={searchParams.get("secret")}
          renderNewMessageForm={() => <MessageFormSocial />}
        />
      </div>
    </div>
  );
}
