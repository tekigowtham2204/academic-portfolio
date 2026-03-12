export function exportCSV(results) {
  const escape = (v) => {
    if (v == null) return '';
    const s = String(v);
    return s.includes(',') || s.includes('"') || s.includes('\n')
      ? `"${s.replace(/"/g, '""')}"`
      : s;
  };

  const headers = ['Rank', 'Name', 'Score', 'Work Exp (40)', 'Education (20)', 'Skills (25)', 'Intro (15)', 'Highlights', 'Red Flags'];
  const rows = results.map((r, i) => [
    i + 1,
    r.resume?.full_name_kanji || r.resume?.full_name_furigana || 'Unknown',
    r.scoring?.score ?? 'N/A',
    r.scoring?.breakdown?.work_experience_relevance ?? '',
    r.scoring?.breakdown?.education_fit ?? '',
    r.scoring?.breakdown?.skill_match ?? '',
    r.scoring?.breakdown?.self_introduction_quality ?? '',
    (r.scoring?.highlights || []).join('; '),
    (r.scoring?.red_flags || []).join('; '),
  ]);

  const csv = [headers, ...rows].map((row) => row.map(escape).join(',')).join('\n');
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `screening-results-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
