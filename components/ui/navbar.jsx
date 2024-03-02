"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const Navbar = () => {
  const pathname = usePathname();
  const isActive = (path) => path === pathname;
  console.log(pathname, isActive("/about"));

  return (
    <header className="header">
      <Link
        href="/"
        // className="w-10 h-10 btn rounded-lg bg-white items-center justify-center flex font-bold shadow-md"
      >
        <p className="">
          <Image
            src={"/assets/images/Noted_Logo_Black.png"}
            alt="logo"
            width={100}
            height={100}
          />
        </p>
      </Link>
      <nav className="flex text-lg gap-7 font-medium">
        <Link
          href="/about"
          className={isActive("/about") ? "text-blue-500" : "text-black"}
        >
          About
        </Link>
        <Link
          href="/notes"
          className={isActive("/notes") ? "text-blue-500" : "text-black"}
        >
          Notes
        </Link>
        <Link
          href="/chat"
          className={isActive("/chats") ? "text-blue-500" : "text-black"}
        >
          Chats
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
