import { useState, Fragment } from 'react';

function ScoreBadge({ score }) {
  let color = 'bg-red-100 text-red-800';
  if (score >= 70) color = 'bg-green-100 text-green-800';
  else if (score >= 40) color = 'bg-yellow-100 text-yellow-800';
  return (
    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold ${color}`}>
      {score}
    </span>
  );
}

function ResumeDetail({ resume }) {
  if (!resume) return null;
  const Section = ({ title, children }) => (
    <div className="mb-3">
      <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">{title}</h4>
      {children}
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
      <Section title="Personal">
        <p><strong>Name:</strong> {resume.full_name_kanji || '—'} {resume.full_name_furigana ? `(${resume.full_name_furigana})` : ''}</p>
        <p><strong>DOB:</strong> {resume.date_of_birth || '—'} {resume.age != null ? `(Age ${resume.age})` : ''}</p>
        <p><strong>JLPT:</strong> {resume.jlpt_level || '—'}</p>
      </Section>

      <Section title="Skills & Certifications">
        {resume.skills_and_certifications?.length ? (
          <div className="flex flex-wrap gap-1">
            {resume.skills_and_certifications.map((s, i) => (
              <span key={i} className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs">{s}</span>
            ))}
          </div>
        ) : <p className="text-gray-400">—</p>}
      </Section>

      <Section title="Education">
        {resume.education?.length ? (
          <ul className="space-y-1">
            {resume.education.map((e, i) => (
              <li key={i}>{e.school} — {e.degree || ''} ({e.graduation_year || '?'})</li>
            ))}
          </ul>
        ) : <p className="text-gray-400">—</p>}
      </Section>

      <Section title="Work History">
        {resume.work_history?.length ? (
          <ul className="space-y-2">
            {resume.work_history.map((w, i) => (
              <li key={i}>
                <p className="font-medium">{w.company} — {w.role || ''}</p>
                <p className="text-gray-500 text-xs">{w.duration || ''}</p>
                {w.responsibilities && <p className="text-xs mt-0.5">{w.responsibilities}</p>}
              </li>
            ))}
          </ul>
        ) : <p className="text-gray-400">—</p>}
      </Section>

      {(resume.self_introduction || resume.pr_section) && (
        <div className="md:col-span-2">
          <Section title="Self-Introduction / PR">
            {resume.self_introduction && <p className="mb-1">{resume.self_introduction}</p>}
            {resume.pr_section && <p>{resume.pr_section}</p>}
          </Section>
        </div>
      )}
    </div>
  );
}

export default function ResultsTable({ results }) {
  const [expandedIdx, setExpandedIdx] = useState(null);

  if (results.length === 0) return null;

  const sorted = [...results]
    .filter((r) => r.scoring)
    .sort((a, b) => (b.scoring?.score ?? 0) - (a.scoring?.score ?? 0));

  const failed = results.filter((r) => r.error);

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left text-xs uppercase tracking-wide text-gray-500">
              <th className="px-4 py-3 w-10">#</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3 w-20 text-center">Score</th>
              <th className="px-4 py-3">Top Highlights</th>
              <th className="px-4 py-3">Red Flags</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((r, idx) => {
              const name = r.resume?.full_name_kanji || r.resume?.full_name_furigana || r.fileName;
              const isOpen = expandedIdx === idx;
              return (
                <Fragment key={idx}>
                  <tr
                    onClick={() => setExpandedIdx(isOpen ? null : idx)}
                    className={`border-b cursor-pointer transition hover:bg-blue-50 ${isOpen ? 'bg-blue-50' : ''}`}
                  >
                    <td className="px-4 py-3 text-gray-400 font-mono">{idx + 1}</td>
                    <td className="px-4 py-3 font-medium">{name}</td>
                    <td className="px-4 py-3 text-center"><ScoreBadge score={r.scoring.score} /></td>
                    <td className="px-4 py-3">
                      <ul className="list-disc list-inside text-xs text-gray-600 space-y-0.5">
                        {(r.scoring.highlights || []).map((h, i) => <li key={i}>{h}</li>)}
                      </ul>
                    </td>
                    <td className="px-4 py-3">
                      {(r.scoring.red_flags || []).length > 0 ? (
                        <ul className="list-disc list-inside text-xs text-red-600 space-y-0.5">
                          {r.scoring.red_flags.map((f, i) => <li key={i}>{f}</li>)}
                        </ul>
                      ) : (
                        <span className="text-xs text-green-600">None</span>
                      )}
                    </td>
                  </tr>
                  {isOpen && (
                    <tr>
                      <td colSpan={5} className="px-6 py-4 bg-gray-50 border-b">
                        <p className="text-sm text-gray-700 mb-3 italic">{r.scoring.explanation}</p>
                        <div className="flex gap-4 mb-3 text-xs">
                          <span className="bg-blue-50 px-2 py-1 rounded">Work Exp: {r.scoring.breakdown?.work_experience_relevance}/40</span>
                          <span className="bg-blue-50 px-2 py-1 rounded">Education: {r.scoring.breakdown?.education_fit}/20</span>
                          <span className="bg-blue-50 px-2 py-1 rounded">Skills: {r.scoring.breakdown?.skill_match}/25</span>
                          <span className="bg-blue-50 px-2 py-1 rounded">Intro: {r.scoring.breakdown?.self_introduction_quality}/15</span>
                        </div>
                        <ResumeDetail resume={r.resume} />
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {failed.length > 0 && (
        <div className="mt-4 border border-red-200 rounded-lg p-3 bg-red-50">
          <h3 className="text-sm font-semibold text-red-700 mb-1">Failed to process ({failed.length})</h3>
          <ul className="text-xs text-red-600 list-disc list-inside space-y-0.5">
            {failed.map((f, i) => (
              <li key={i}><strong>{f.fileName}:</strong> {f.error}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
