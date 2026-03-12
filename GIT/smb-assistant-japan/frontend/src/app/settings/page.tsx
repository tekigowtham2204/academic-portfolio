"use client";

import { useEffect, useState } from "react";
import { useSettings } from "@/context/SettingsContext";
import { getSettingsOptions } from "@/lib/api";
import { Settings, CheckCircle2, Globe, Cpu } from "lucide-react";

interface Options {
  models: { id: string; name: string }[];
  languages: { id: string; label: string }[];
}

export default function SettingsPage() {
  const { language, model, setLanguage, setModel } = useSettings();
  const [options, setOptions] = useState<Options | null>(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getSettingsOptions()
      .then(setOptions)
      .catch(() =>
        setOptions({
          models: [
            { id: "gpt-4o", name: "GPT-4o" },
            { id: "gpt-4o-mini", name: "GPT-4o Mini" },
          ],
          languages: [
            { id: "en", label: "English" },
            { id: "ja", label: "日本語 (Japanese)" },
          ],
        })
      )
      .finally(() => setLoading(false));
  }, []);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-8 h-8 border-3 border-brand-200 border-t-brand-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto py-12 md:py-16 px-4 md:px-6">
      <div className="text-center mb-10">
        <div className="w-12 h-12 bg-brand-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Settings className="text-brand-500" size={22} />
        </div>
        <h1 className="text-2xl font-extrabold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-400 mt-1">設定 — Preferences</p>
      </div>

      <div className="space-y-4">
        {/* Language Card */}
        <div className="bg-white rounded-2xl p-5 shadow-card border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center">
              <Globe className="text-blue-500" size={18} />
            </div>
            <div>
              <label htmlFor="language-select" className="text-sm font-bold text-gray-900">
                Language
              </label>
              <p className="text-[11px] text-gray-400">言語</p>
            </div>
          </div>
          <select
            id="language-select"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-transparent"
          >
            {options?.languages.map((l) => (
              <option key={l.id} value={l.id}>
                {l.label}
              </option>
            ))}
          </select>
        </div>

        {/* Model Card */}
        <div className="bg-white rounded-2xl p-5 shadow-card border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 bg-purple-50 rounded-xl flex items-center justify-center">
              <Cpu className="text-purple-500" size={18} />
            </div>
            <div>
              <label htmlFor="model-select" className="text-sm font-bold text-gray-900">
                AI Model
              </label>
              <p className="text-[11px] text-gray-400">AIモデル</p>
            </div>
          </div>
          <select
            id="model-select"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-transparent"
          >
            {options?.models.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>
        </div>

        {/* Save */}
        <button
          onClick={handleSave}
          className="w-full bg-brand-500 text-white rounded-full px-4 py-3 text-sm font-semibold hover:bg-brand-600 shadow-float hover-lift"
        >
          Save Preferences / 保存
        </button>

        {saved && (
          <div className="flex items-center justify-center gap-2 text-sm text-green-600 font-medium bg-green-50 rounded-full py-2.5">
            <CheckCircle2 size={16} />
            <span>Saved! 設定を保存しました。</span>
          </div>
        )}
      </div>
    </div>
  );
}
