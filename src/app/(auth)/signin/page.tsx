"use client";

import { Icon } from "@/components/atoms/icon";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignInPage() {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/");
    }
  }, [session, router]);

  return (
    <div className="flex flex-col gap-y-8 items-center justify-center min-h-screen bg-gray-100 px-6 text-center">
      <h1 className="text-8xl">👨‍💻</h1>

      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Join the Coding Community!</h1>
        <p className="text-gray-600 text-center max-w-md">
          Sign in or register to start sharing your coding knowledge, writing blogs, and engaging with other developers! 🚀
        </p>
      </div>

      <div className="flex flex-col gap-y-6">
        <button
          onClick={() => signIn("google")}
          className="px-6 py-3 bg-gray-600 text-sm font-semibold text-white rounded-lg shadow-md hover:bg-blue-700 transition flex items-center"
        >
          <span className="mr-2"><Icon name="google" width={24} height={24} /></span> Continue with Google
        </button>
        <button
          onClick={() => signIn("facebook")}
          className="px-6 py-3 bg-gray-200 text-sm font-semibold text-primary rounded-lg shadow-md hover:bg-gray-600 hover:text-white transition flex items-center"
        >
          <span className="mr-2"><Icon name="facebook" width={24} height={24} /></span> Continue with Facebook
        </button>
      </div>

      <p className="mt-6 text-gray-600 text-sm">
        New here? Just sign in and we&apos;ll create your account automatically! 💡
      </p>
    </div>
  );
}
