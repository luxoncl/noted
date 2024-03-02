"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";

const Home = () => {
  return (
    <main className="flex h-full flex-col items-center justify-center ">
      <div className="space-y-6 text-center">
        <h1
          className={cn(
            "text-6xl font-semibold drop-shadow-md"
            // font.className
          )}
        >
          noted.
        </h1>
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
      </div>
    </main>
  );
};

export default Home;
