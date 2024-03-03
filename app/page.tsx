"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";
// import { ModelViewer } from "@/lib/modelviewer";
import Image from "next/image";

const Home = () => {
  return (
    <main className="flex h-full flex-col items-center justify-center ">
      {/* <div className="space-y-6 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {
              scale: 0.8,
              opacity: 0,
            },
            visible: {
              scale: 1,
              opacity: 1,
              transition: {
                delay: 0.4,
              },
            },
          }}
        >
          {" "}
          <h1
            className={cn(
              "text-6xl font-semibold drop-shadow-md"
              // font.className
            )}
          >
            noted.
          </h1>
        </motion.div>
        <p className="text-lg">
          A simple note-taking app with a focus on privacy.
        </p>
        <div>
          <LoginButton asChild>
            <Button variant="secondary" size="lg">
              Sign in
            </Button>
          </LoginButton>
        </div>
      </div> */}
      <header
        id="home"
        className="flex flex-col-reverse md:flex-row w-full h-screen max-w-7xl items-center justify-center p-8 relative overflow-x-hidden"
      >
        <div className="w-full h-2/4 md:h-full md:w-2/5 flex flex-col justify-center items-center md:items-start gap-8">
          <div className="flex flex-col gap-2">
            <Image
              src="/assets/images/header_logo.png"
              width={300}
              height={10}
              alt="logo"
            />
            <h2 className="text-md md:text-2xl" style={{ marginLeft: "10px" }}>
              taking notes made easier!
            </h2>
          </div>
          <p
            className="max-w-md text-sm md:text-base text-zinc-500"
            style={{ marginLeft: "10px" }}
          >
            We transcend learning boundaries, empowering users worldwide to
            engage, collaborate, and thrive.
          </p>

          <div
            className="w-full flex items-center justify-center md:justify-start gap-4"
            style={{ marginLeft: "10px" }}
          >
            <LoginButton asChild>
              <Button
                className="w-48 h-12 text-sm sm:text-base rounded bg-white text-black hover:bg-fuchsia-700 hover:text-white transition-colors"
                variant="secondary"
                size="lg"
              >
                Sign in
              </Button>
            </LoginButton>
          </div>
        </div>

        <div className="w-full h-2/4 md:h-full md:w-3/5 flex items-center justify-center relative -z-10">
          {/* <Spline
            className="w-full flex scale-[.25] sm:scale-[.35] lg:scale-[.5] items-center justify-center md:justify-start"
            scene="https://prod.spline.design/pvM5sSiYV2ivWraz/scene.splinecode"
          /> */}
          {/* <ModelViewer /> */}
        </div>
      </header>
    </main>
  );
};

export default Home;
