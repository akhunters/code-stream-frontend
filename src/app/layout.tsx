import type { Metadata } from "next";
import { Source_Serif_4 } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/providers/auth-provider";
import { NavBar } from "@/components/organisms/nav-bar";

const sourceSerif4 = Source_Serif_4({
  variable: "--font-source-serif-4",
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Code Stream Blog",
  description: "A blog about software development",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body
          className={`${sourceSerif4.variable} antialiased`}
        >
          <div className="flex flex-col min-h-screen">
            <NavBar />
            {children}
          </div>
        </body>
      </AuthProvider>
    </html>
  );
}
