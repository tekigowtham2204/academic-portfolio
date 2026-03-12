import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import ErrorBoundary from "@/components/ErrorBoundary";
import { SettingsProvider } from "@/context/SettingsContext";

export const metadata: Metadata = {
  title: "SMB Assistant Japan",
  description: "AI-powered document assistant for Japanese SMBs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <SettingsProvider>
          <Header />
          <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
            <ErrorBoundary>{children}</ErrorBoundary>
          </main>
          <BottomNav />
        </SettingsProvider>
      </body>
    </html>
  );
}
