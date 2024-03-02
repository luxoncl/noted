import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

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
  console.log(router.query);

  useEffect(() => {
    setShowChat(true);
  }, []);

  if (!showChat) return <div />;

  return (
    <div className="background">
      <div className="shadow">
        <ChatEngine
          height="calc(100ch - 200px)"
          projectID="da891444-d17f-4a2b-8cd5-a2fec4b96c20"
          userName={router.query.username}
          userSecret={router.query.secret}
          renderNewMessageForm={() => <MessageFormSocial />}
        />
      </div>
    </div>
  );
}
