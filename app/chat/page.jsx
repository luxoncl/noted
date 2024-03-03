"use client";

import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Auth() {
  const [username, setUsername] = useState("");
  const [secret, setSecret] = useState("");
  const router = useRouter();

  function onSubmit(e) {
    e.preventDefault();
    if (username.length === 0 || secret.length === 0) return;
    axios
      .put(
        "https://api.chatengine.io/users/",
        { username, secret },
        { headers: { "Private-key": "70f41bcd-7804-4f9c-9b67-d67125e6fb82" } }
      )
      .then((r) => router.push(`/chats?username=${username}&secret=${secret}`));
  }
  return (
    <div className="background">
      <div className="auth-container">
        <form className="auth-form" onSubmit={(e) => onSubmit(e)}>
          <div className="auth-title"> Lets Chat Guys!!</div>
          <div className="input-container">
            <input
              placeholder="Email"
              className="text-input"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              placeholder="Password"
              className="text-input"
              onChange={(e) => setSecret(e.target.value)}
            />
          </div>
          <button type="submit" className="submit-button">
            Chat
          </button>
        </form>
      </div>
    </div>
  );
}
