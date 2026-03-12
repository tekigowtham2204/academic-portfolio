import Link from "next/link";
import { Upload, MessageSquare, Settings, ArrowRight } from "lucide-react";

const features = [
  {
    href: "/upload",
    icon: Upload,
    title: "Upload Documents",
    titleJa: "ドキュメントをアップロード",
    description: "Drag & drop PDF or TXT files to build your knowledge base.",
    color: "bg-orange-50 text-orange-500",
  },
  {
    href: "/chat",
    icon: MessageSquare,
    title: "Chat with AI",
    titleJa: "AIとチャット",
    description: "Ask questions about your documents in English or Japanese.",
    color: "bg-brand-50 text-brand-500",
  },
  {
    href: "/settings",
    icon: Settings,
    title: "Configure",
    titleJa: "設定",
    description: "Choose your preferred language, model, and preferences.",
    color: "bg-blue-50 text-blue-500",
  },
];

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-4">
      {/* Hero */}
      <section className="pt-16 pb-12 md:pt-24 md:pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-brand-50 text-brand-600 text-xs font-semibold px-3.5 py-1.5 rounded-full mb-6">
          <span className="w-1.5 h-1.5 bg-brand-500 rounded-full" />
          AI-Powered Document Assistant
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
          SMB Assistant
          <span className="text-brand-500"> Japan</span>
        </h1>
        <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto leading-relaxed">
          Upload documents and chat with your business knowledge base.
        </p>
        <p className="mt-1 text-base text-gray-400">
          ドキュメントをアップロードして、ビジネスナレッジベースとチャットしましょう。
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/upload"
            className="inline-flex items-center gap-2 bg-brand-600 text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-brand-700 shadow-float hover-lift"
          >
            Get Started
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/chat"
            className="inline-flex items-center gap-2 bg-white text-gray-700 text-sm font-medium px-6 py-3 rounded-full border border-gray-200 hover:border-gray-300 hover:bg-gray-50 shadow-card hover-lift"
          >
            Open Chat
          </Link>
        </div>
      </section>

      {/* Feature cards */}
      <section className="pb-20 grid grid-cols-1 md:grid-cols-3 gap-4">
        {features.map(({ href, icon: Icon, title, titleJa, description, color }) => (
          <Link
            key={href}
            href={href}
            className="group bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover hover-lift border border-gray-100"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color} mb-4`}>
              <Icon size={20} />
            </div>
            <h3 className="text-base font-bold text-gray-900 group-hover:text-brand-600">
              {title}
            </h3>
            <p className="text-xs text-gray-400 mt-0.5 mb-2">{titleJa}</p>
            <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}
