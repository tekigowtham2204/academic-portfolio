import { useState, useCallback } from 'react';
import FileUpload from './components/FileUpload.jsx';
import JobDescription from './components/JobDescription.jsx';
import ProgressBar from './components/ProgressBar.jsx';
import ResultsTable from './components/ResultsTable.jsx';
import { parseResume, scoreResume } from './api.js';
import { exportCSV } from './csv.js';

export default function App() {
  const [files, setFiles] = useState([]);
  const [jd, setJd] = useState('');
  const [results, setResults] = useState([]);
  const [progress, setProgress] = useState({ completed: 0, total: 0, failures: 0 });
  const [screening, setScreening] = useState(false);

  const screenAll = useCallback(async () => {
    if (files.length === 0 || jd.trim() === '') return;

    setScreening(true);
    setResults([]);
    setProgress({ completed: 0, total: files.length, failures: 0 });

    const collected = [];
    let failures = 0;

    for (const file of files) {
      const entry = { fileName: file.name, resume: null, scoring: null, error: null };

      try {
        entry.resume = await parseResume(file);
      } catch (err) {
        entry.error = `Parse: ${err.message}`;
        failures++;
        collected.push(entry);
        setResults([...collected]);
        setProgress((p) => ({ ...p, completed: p.completed + 1, failures }));
        continue;
      }

      try {
        entry.scoring = await scoreResume(entry.resume, jd);
      } catch (err) {
        entry.error = `Score: ${err.message}`;
        failures++;
      }

      collected.push(entry);
      setResults([...collected]);
      setProgress((p) => ({ ...p, completed: p.completed + 1, failures }));
    }

    setScreening(false);
  }, [files, jd]);

  const hasResults = results.some((r) => r.scoring);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-lg font-bold text-gray-800">
            履歴書 Screening Dashboard
          </h1>
          {hasResults && (
            <button
              onClick={() => exportCSV(results)}
              className="text-sm px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
            >
              Export CSV
            </button>
          )}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {/* Input section */}
        <div className="bg-white rounded-xl shadow-sm border p-5 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <FileUpload files={files} setFiles={setFiles} />
            <JobDescription value={jd} onChange={setJd} />
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={screenAll}
              disabled={screening || files.length === 0 || jd.trim() === ''}
              className="px-5 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg
                hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              {screening ? 'Screening…' : 'Screen All'}
            </button>
            <span className="text-xs text-gray-400">
              {files.length} file{files.length !== 1 ? 's' : ''} selected
            </span>
          </div>
        </div>

        {/* Progress */}
        {progress.total > 0 && (
          <ProgressBar
            completed={progress.completed}
            total={progress.total}
            failures={progress.failures}
          />
        )}

        {/* Results */}
        {results.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border p-5">
            <ResultsTable results={results} />
          </div>
        )}
      </main>
    </div>
  );
}
