"use client";

import { useState, useRef, useEffect, FormEvent, useCallback } from "react";
import { Send, Download, AlertCircle } from "lucide-react";
import { sendChat, saveHistoryMessage, getHistory } from "@/lib/api";
import { useSettings } from "@/context/SettingsContext";
import Spinner from "@/components/Spinner";

interface Message {
  role: "user" | "assistant";
  content: string;
  sources?: string[];
  detectedLang?: string;
}

function getSessionId(): string {
  if (typeof window === "undefined") return "";
  let id = sessionStorage.getItem("smb_session_id");
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem("smb_session_id", id);
  }
  return id;
}

export default function ChatPage() {
  const { language, model } = useSettings();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const sessionId = useRef(getSessionId());

  // Load history on mount
  useEffect(() => {
    if (!sessionId.current) return;
    getHistory(sessionId.current)
      .then((msgs) => {
        if (msgs.length > 0) {
          setMessages(
            msgs.map((m) => ({
              role: m.role as "user" | "assistant",
              content: m.content,
              sources: m.sources || undefined,
              detectedLang: m.detected_language || undefined,
            }))
          );
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const persistMessage = useCallback(
    (role: string, content: string, detected_language?: string, sources?: string[]) => {
      saveHistoryMessage({
        session_id: sessionId.current,
        role,
        content,
        detected_language,
        sources,
      }).catch(() => {});
    },
    []
  );

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    setInput("");
    setError(null);
    setLoading(true);

    try {
      const data = await sendChat(text, language, model);
      const lang = data.detected_language || "en";
      setMessages((prev) => [
        ...prev,
        { role: "user", content: text, detectedLang: lang },
        {
          role: "assistant",
          content: data.reply,
          sources: data.sources,
          detectedLang: lang,
        },
      ]);
      persistMessage("user", text, lang);
      persistMessage("assistant", data.reply, lang, data.sources);
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Request failed";
      setError(msg);
      setMessages((prev) => [
        ...prev,
        { role: "user", content: text, detectedLang: "en" },
      ]);
      persistMessage("user", text, "en");
    } finally {
      setLoading(false);
    }
  }

  async function exportPdf() {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 15;
    const maxWidth = pageWidth - margin * 2;
    let y = 20;

    doc.setFontSize(16);
    doc.text("SMB Assistant Japan — Chat Export", margin, y);
    y += 12;
    doc.setFontSize(10);

    for (const msg of messages) {
      const label = msg.role === "user" ? "You" : "Assistant";
      const badge = msg.detectedLang === "ja" ? "[JA]" : "[EN]";
      const header = `${badge} ${label}:`;

      if (y > 270) {
        doc.addPage();
        y = 20;
      }

      doc.setFont("helvetica", "bold");
      doc.text(header, margin, y);
      y += 6;

      doc.setFont("helvetica", "normal");
      const lines = doc.splitTextToSize(msg.content, maxWidth);
      for (const line of lines) {
        if (y > 280) {
          doc.addPage();
          y = 20;
        }
        doc.text(line, margin, y);
        y += 5;
      }
      y += 4;
    }

    doc.save("smb-assistant-chat.pdf");
  }

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)]">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 md:px-6 py-3 flex items-center justify-between">
        <div>
          <h1 className="text-base font-bold text-gray-900">Chat</h1>
          <p className="text-[11px] text-gray-400">
            {language === "ja"
              ? "ドキュメントについて質問してください"
              : "Ask questions about your uploaded documents"}
          </p>
        </div>
        {messages.length > 0 && (
          <button
            onClick={exportPdf}
            className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-brand-600 bg-gray-50 hover:bg-brand-50 rounded-full px-3.5 py-1.5 font-medium"
          >
            <Download size={14} />
            Export
          </button>
        )}
      </div>

      {/* Error card */}
      {error && (
        <div className="mx-4 md:mx-6 mt-3 bg-brand-50 border border-brand-200 rounded-2xl p-4 flex items-start gap-3 shadow-card">
          <AlertCircle className="text-brand-600 mt-0.5 shrink-0" size={18} />
          <div className="flex-1">
            <p className="text-sm font-semibold text-brand-700">Request failed</p>
            <p className="text-xs text-brand-500 mt-0.5">{error}</p>
          </div>
          <button
            onClick={() => setError(null)}
            className="text-xs text-brand-400 hover:text-brand-600"
          >
            ✕
          </button>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 md:px-6 py-4 space-y-3">
        {messages.length === 0 && (
          <div className="text-center mt-24 space-y-3">
            <div className="w-12 h-12 bg-brand-50 rounded-2xl flex items-center justify-center mx-auto">
              <Send className="text-brand-400" size={20} />
            </div>
            <p className="text-sm text-gray-400 font-medium">
              {language === "ja"
                ? "メッセージを入力してチャットを始めましょう"
                : "Type a message to start chatting"}
            </p>
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`min-w-[80px] max-w-[80%] md:max-w-[70%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-brand-500 text-white shadow-float rounded-br-md"
                  : "bg-white text-gray-800 shadow-card rounded-bl-md"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                {msg.detectedLang && (
                  <span
                    className={`text-[10px] font-bold uppercase rounded px-1.5 py-0.5 ${
                      msg.role === "user"
                        ? "bg-white/20 text-white"
                        : msg.detectedLang === "ja"
                          ? "bg-red-50 text-red-500"
                          : "bg-blue-50 text-blue-500"
                    }`}
                  >
                    {msg.detectedLang === "ja" ? "JA" : "EN"}
                  </span>
                )}
              </div>
              <p className="whitespace-pre-wrap">{msg.content}</p>
              {msg.sources && msg.sources.length > 0 && (
                <div className="mt-2 pt-2 border-t border-gray-100/50 text-xs text-gray-400">
                  Sources: {msg.sources.join(", ")}
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-white shadow-card rounded-3xl px-5 py-3.5 flex items-center gap-1.5">
              <div className="w-2 h-2 bg-brand-400 rounded-full typing-dot" />
              <div className="w-2 h-2 bg-brand-300 rounded-full typing-dot" />
              <div className="w-2 h-2 bg-brand-200 rounded-full typing-dot" />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-4 md:px-6 py-3 md:py-4">
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 bg-white rounded-full shadow-float border border-gray-100 pl-5 pr-1.5 py-1.5"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              language === "ja" ? "メッセージを入力…" : "Type your message…"
            }
            disabled={loading}
            className="flex-1 bg-transparent text-sm focus:outline-none disabled:opacity-50 placeholder:text-gray-300"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            aria-label="Send message"
            className="w-9 h-9 flex items-center justify-center bg-brand-500 text-white rounded-full hover:bg-brand-600 disabled:opacity-30 shrink-0"
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
