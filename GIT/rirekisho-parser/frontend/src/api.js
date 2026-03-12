const API_BASE = '/api';

export async function parseResume(file) {
  const form = new FormData();
  form.append('file', file);
  const res = await fetch(`${API_BASE}/parse`, { method: 'POST', body: form });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(err.detail || 'Parse failed');
  }
  return res.json();
}

export async function scoreResume(resume, jobDescription) {
  const res = await fetch(`${API_BASE}/score`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ resume, job_description: jobDescription }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(err.detail || 'Score failed');
  }
  return res.json();
}
