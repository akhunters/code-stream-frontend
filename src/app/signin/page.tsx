"use client";
import { signIn, useSession, signOut } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function SignIn() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.accessToken) {
      router.push("/dashboard");
      localStorage.setItem("accessToken", session.accessToken);
    }
  }, [session]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">Sign In</h1>
      {!session ? (
        <>
          <button onClick={() => signIn("google")} className="mt-4 px-6 py-2 bg-red-500 text-white rounded">
            Sign in with Google
          </button>
          <button onClick={() => signIn("facebook")} className="mt-4 px-6 py-2 bg-blue-500 text-white rounded">
            Sign in with Facebook
          </button>
        </>
      ) : (
        <>
          <p className="mt-4">Signed in as {session.user?.email}</p>
          <Image
            width={24}
            height={24}
            src={session.user?.image || ""}
            alt="User profile picture"
            className="rounded-full shadow-md"
            priority
          />
          <button
            onClick={() => {
              signOut();
              localStorage.removeItem("jwt");
            }}
            className="mt-4 px-6 py-2 bg-gray-500 text-white rounded"
          >
            Sign Out
          </button>
        </>
      )}
    </div>
  );
}
