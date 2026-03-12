"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Upload, MessageSquare, Settings, Home } from "lucide-react";

const links = [
  { href: "/", label: "Home", icon: Home },
  { href: "/upload", label: "Upload", icon: Upload },
  { href: "/chat", label: "Chat", icon: MessageSquare },
  { href: "/settings", label: "Settings", icon: Settings },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-t border-gray-100 safe-area-pb">
      <div className="flex items-center justify-around h-16 px-2">
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl min-w-[64px] transition-all ${
                active
                  ? "text-brand-600"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <Icon size={20} strokeWidth={active ? 2.5 : 2} />
              <span className={`text-[10px] font-medium ${active ? "text-brand-600" : ""}`}>
                {label}
              </span>
              {active && (
                <div className="absolute top-0 w-8 h-0.5 bg-brand-500 rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
