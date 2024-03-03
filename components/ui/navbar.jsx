"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { logout } from "@/actions/logout";
import { useSession } from "next-auth/react";
import ThemeToggle from "./theme-toggle";
import { useTheme } from "next-themes";

const Navbar = () => {
  const pathname = usePathname();
  const isActive = (path) => path === pathname;

  const { data: session } = useSession();
  const { theme } = useTheme();

  return (
    <header className="flex justify-between items-center sm:px-16 px-8 py-4 max-w-5xl mx-auto z-[100]">
      <Link
        href="/"
        // className="w-10 h-10 btn rounded-lg bg-white items-center justify-center flex font-bold shadow-md"
      >
        <p className="">
          {theme === "light" ? (
            <Image
              src={"/assets/images/Noted_Logo_Black.png"}
              alt="black-logo"
              width={100}
              height={100}
            />
          ) : (
            <Image
              src={"/assets/images/Noted_Logo_White.png"}
              alt="white-logo"
              width={100}
              height={100}
            />
          )}
        </p>
      </Link>
      <nav className="flex text-lg gap-7 font-medium">
        <Link
          href="/about"
          className={isActive("/about") ? "text-blue-500" : ""}
        >
          About
        </Link>
        <Link
          href="/chat"
          className={isActive("/chats") ? "text-blue-500" : ""}
        >
          Chats
        </Link>
        <Link
          href="/notes"
          className={isActive("/notes") ? "text-blue-500" : ""}
        >
          Notes
        </Link>
        <Link
          href="/sticks"
          className={isActive("/sticks") ? "text-blue-500" : ""}
        >
          Sticks
        </Link>
        {session ? (
          <Button onClick={() => logout()}>Logout</Button>
        ) : (
          <Link href="/auth/login">Login</Link>
        )}
        <ThemeToggle />
      </nav>
    </header>
  );
};

export default Navbar;
