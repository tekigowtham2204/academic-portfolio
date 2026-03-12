"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Upload, MessageSquare, Settings } from "lucide-react";

const links = [
  { href: "/upload", label: "Upload", labelJa: "アップロード", icon: Upload },
  { href: "/chat", label: "Chat", labelJa: "チャット", icon: MessageSquare },
  { href: "/settings", label: "Settings", labelJa: "設定", icon: Settings },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 bg-brand-500 rounded-xl flex items-center justify-center">
            <span className="text-white font-extrabold text-sm">S</span>
          </div>
          <div className="hidden sm:block">
            <span className="text-base font-bold text-gray-900">SMB Assistant</span>
            <span className="text-[10px] text-gray-400 ml-1.5 font-medium">Japan</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  active
                    ? "bg-brand-50 text-brand-600"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <Icon size={16} />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right side — subtle badge */}
        <div className="hidden sm:flex items-center">
          <span className="text-[10px] text-gray-400 bg-gray-50 rounded-full px-2.5 py-1 font-medium">
            GPT-4o
          </span>
        </div>
      </div>
    </header>
  );
}
