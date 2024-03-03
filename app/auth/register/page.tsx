"use client";

import { RegisterForm } from "@/components/auth/register-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

const RegisterPage = () => {
  const router = useRouter();
  const { theme } = useTheme();

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
        <div className="flex flex-col justify-center items-center relative">
          <div className="heading">
            <h1>Note: All the letters are in uppercase.</h1>
          </div>
          <div className="flex">
            {/* <video className="custom-video" autoPlay loop preload="auto">
              {theme === "dark" ? (
                <source
                  src="/assets/images/Captcha_Black.mp4"
                  type="video/mp4"
                />
              ) : (
                <source
                  src="/assets/images/Captcha_White.mp4"
                  type="video/mp4"
                />
              )}
              Your browser does not support the video tag.
            </video> */}

            <video className="custom-video" autoPlay loop preload="auto">
              <source src="/assets/images/Captcha_Black.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="captcha_outer flex-row absolute top-12 left-[14.5%]">
            <div
              className="captcha_output text-9xl tracking-[10rem] text-white p-5"
              dangerouslySetInnerHTML={{
                __html: captcha,
              }}
            ></div>
          </div>
          <div className="captcha_valid flex-row mt-10 z-10">
            <div className="fillcaptcha">
              <Input
                type="text"
                id="txtInput"
                value={input}
                onChange={(e: any) => setInput(e.target.value)}
              />
            </div>
            <div className="flex justify-center items-center gap-2 mt-5">
              <Button variant="outline" id="refresh" onClick={handleRefresh}>
                Refresh
              </Button>
              <div className="valid_captcha text-center">
                <Button
                  variant="outline"
                  id="CheckCaptcha"
                  onClick={handleCheckCaptcha}
                >
                  Check
                </Button>
              </div>
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
