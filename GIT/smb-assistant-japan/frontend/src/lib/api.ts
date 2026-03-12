const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export async function uploadFile(file: File) {
  const form = new FormData();
  form.append("file", file);
  const res = await fetch(`${API_URL}/upload`, {
    method: "POST",
    body: form,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => null);
    throw new Error(err?.detail || "Upload failed");
  }
  return res.json();
}

export async function sendChat(
  message: string,
  language: string,
  model: string | null
) {
  const body: Record<string, string> = { message, language };
  if (model) body.model = model;

  const res = await fetch(`${API_URL}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => null);
    throw new Error(err?.detail || "Chat request failed");
  }
  return res.json() as Promise<{
    reply: string;
    sources: string[];
    detected_language: string;
  }>;
}

export async function getSettingsOptions() {
  const res = await fetch(`${API_URL}/settings/options`);
  if (!res.ok) throw new Error("Failed to load settings");
  return res.json() as Promise<{
    models: { id: string; name: string }[];
    languages: { id: string; label: string }[];
  }>;
}

export async function saveHistoryMessage(body: {
  session_id: string;
  role: string;
  content: string;
  detected_language?: string;
  sources?: string[];
}) {
  await fetch(`${API_URL}/history`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

export async function getHistory(sessionId: string) {
  const res = await fetch(
    `${API_URL}/history?session_id=${encodeURIComponent(sessionId)}`
  );
  if (!res.ok) return [];
  const data = await res.json();
  return data.messages as {
    role: string;
    content: string;
    detected_language?: string;
    sources?: string[];
  }[];
}
