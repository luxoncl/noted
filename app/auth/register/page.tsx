"use client";

import { RegisterForm } from "@/components/auth/register-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const router = useRouter();

  const [captcha, setCaptcha] = useState("");
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Define font styles
  const fontStyles = [
    "font-us-angel",
    "font-old-english",
    "font-poster-script",
    "font-cloister",
  ];

  const generateCaptcha = () => {
    const alpha = Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
    let code = "";
    for (let i = 0; i < 4; i++) {
      const randomChar = alpha[Math.floor(Math.random() * alpha.length)];
      code += `<span class="${fontStyles[i]}">${randomChar}</span>`;
    }
    return code;
  };

  const handleRefresh = () => {
    const newCaptcha = generateCaptcha();
    setCaptcha(newCaptcha);
    setInput("");
    setError("");
    setSuccess("");
  };

  const handleCheckCaptcha = () => {
    const formattedCaptcha = captcha.replace(/<[^>]*>?/gm, "");
    const formattedInput = input.split(" ").join("");
    if (formattedCaptcha === formattedInput) {
      setSuccess("Captcha is validated Successfully");
      setError("");
      localStorage.setItem("isCaptchaDone", "true");
      router.refresh();
    } else {
      setSuccess("");
      setError("Please enter a valid captcha.");
    }
  };

  useEffect(() => {
    const newCaptcha = generateCaptcha();
    setCaptcha(newCaptcha);
  }, []);

  return (
    <>
      {localStorage.getItem("isCaptchaDone") === "true" ? (
        <RegisterForm />
      ) : (
        <div className="full-row">
          <div className="heading">
            <h1>Note: All the letters are in uppercase.</h1>
          </div>
          <div className="captcha_outer flex-row">
            <div
              className="captcha_output text-9xl tracking-[10rem]"
              dangerouslySetInnerHTML={{
                __html: captcha,
              }}
            ></div>
            <div className="captcha_gen">
              <button id="refresh" onClick={handleRefresh}>
                Refresh
              </button>
            </div>
          </div>
          <div className="captcha_valid flex-row">
            <div className="fillcaptcha">
              <input
                type="text"
                id="txtInput"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
            <div className="valid_captcha">
              <button id="CheckCaptcha" onClick={handleCheckCaptcha}>
                Check
              </button>
            </div>
          </div>
          <div className="valid-msg-error">
            <span id="error" style={{ color: "red" }}>
              {error}
            </span>
            <span id="success" style={{ color: "green" }}>
              {success}
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default RegisterPage;
