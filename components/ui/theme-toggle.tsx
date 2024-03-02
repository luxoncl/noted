"use client";

import * as React from "react";
import { useRef } from "react";
import { useTheme } from "next-themes";
import { flushSync } from "react-dom";
import { LuMoon, LuSunMedium } from "react-icons/lu";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const circleRef = useRef(null);

  const onClickHandler = async () => {
    if (
      !circleRef.current ||
      !document.startViewTransition ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setTheme(theme === "dark" ? "light" : "dark");
      return;
    }

    await document.startViewTransition(() => {
      flushSync(() => {
        setTheme(theme === "dark" ? "light" : "dark");
      });
    }).ready;

    const { top, left, width, height } = (
      circleRef.current as HTMLElement
    ).getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const right = window.innerWidth - left;
    const bottom = window.innerHeight - top;
    const maxRadius = Math.hypot(Math.max(left, right), Math.max(top, bottom));

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 500,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      }
    );
  };

  return (
    <Button
      variant="ghost"
      ref={circleRef}
      size="icon"
      className={cn(
        "max-sm:py-8 transform transition-transform focus:outline-none active:scale-95 hover:bg-transparent rounded-full hover:scale-125"
      )}
      onClick={onClickHandler}
    >
      <LuSunMedium className="icon-sun h-[1.4rem] w-[1.4rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <LuMoon className="icon-moon absolute h-[1.2rem] w-[1.2rem] rotate-90 transition-all scale-0 dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
