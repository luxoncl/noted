"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const isActive = (path) => path === pathname;
  console.log(pathname, isActive("/about"));

  return (
    <header className="header">
      <Link
        href="/"
        className="w-10 h-10 btn rounded-lg bg-white items-center justify-center flex font-bold shadow-md"
      >
        <p className="blue-gradient_text"> AH</p>
      </Link>
      <nav className="flex text-lg gap-7 font-medium">
        <Link
          href="/about"
          className={isActive("/about") ? "text-blue-500" : "text-black"}
        >
          About
        </Link>
        <Link
          href="/projects"
          className={isActive("/projects") ? "text-blue-500" : "text-black"}
        >
          Projects
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
