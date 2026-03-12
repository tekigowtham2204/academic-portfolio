"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Upload, MessageSquare, Settings } from "lucide-react";

const links = [
  { href: "/upload", label: "Upload", labelJa: "アップロード", icon: Upload },
  { href: "/chat", label: "Chat", labelJa: "チャット", icon: MessageSquare },
  { href: "/settings", label: "Settings", labelJa: "設定", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-5 border-b border-gray-100">
        <Link href="/" className="text-lg font-bold text-brand-700">
          SMB Assistant
        </Link>
        <p className="text-xs text-gray-400 mt-0.5">Japan Edition</p>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {links.map(({ href, label, labelJa, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? "bg-brand-50 text-brand-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon size={18} />
              <span>
                {label}{" "}
                <span className="text-[11px] text-gray-400">{labelJa}</span>
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-100 text-xs text-gray-400">
        Powered by GPT-4o
      </div>
    </aside>
  );
}
