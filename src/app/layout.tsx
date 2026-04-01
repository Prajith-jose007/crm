import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";
import LoginGuard from "@/components/LoginGuard";

export const metadata: Metadata = {
  title: "SITRIX CRM",
  description: "Enterprise Yacht Sales Management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <LoginGuard>
            <Navbar />
            <div id="main">{children}</div>
          </LoginGuard>
        </AuthProvider>
      </body>
    </html>
  );
}
