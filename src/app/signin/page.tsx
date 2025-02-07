"use client";

import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignIn() {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/");
    }
  }, [session]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">Sign In</h1>
      <>
        <Button onClick={() => signIn('google')} className="mt-4 px-6 py-2 bg-red-500 text-white rounded">
          Sign in with Google
        </Button>
        <Button onClick={() => signIn('facebook')} className="mt-4 px-6 py-2 bg-blue-500 text-white rounded">
          Sign in with Facebook
        </Button>
      </>
    </div>
  );
}
