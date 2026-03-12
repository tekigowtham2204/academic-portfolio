"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface Settings {
  language: string;
  model: string;
}

interface SettingsCtx extends Settings {
  setLanguage: (lang: string) => void;
  setModel: (model: string) => void;
}

const SettingsContext = createContext<SettingsCtx>({
  language: "en",
  model: "gpt-4o",
  setLanguage: () => {},
  setModel: () => {},
});

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState("en");
  const [model, setModel] = useState("gpt-4o");

  return (
    <SettingsContext.Provider value={{ language, model, setLanguage, setModel }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
