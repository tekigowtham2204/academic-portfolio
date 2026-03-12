import { useState } from 'react';

const MAX_FILES = 20;
const ACCEPTED = '.pdf,.png,.jpg,.jpeg,.webp';

export default function FileUpload({ files, setFiles }) {
  const [dragOver, setDragOver] = useState(false);

  const addFiles = (incoming) => {
    const next = [...files];
    for (const f of incoming) {
      if (next.length >= MAX_FILES) break;
      if (!next.some((x) => x.name === f.name && x.size === f.size)) {
        next.push(f);
      }
    }
    setFiles(next);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    addFiles(Array.from(e.dataTransfer.files));
  };

  const handleChange = (e) => {
    addFiles(Array.from(e.target.files));
    e.target.value = '';
  };

  const remove = (idx) => setFiles(files.filter((_, i) => i !== idx));

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1">
        Resumes (PDF / Image, max {MAX_FILES})
      </label>
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition
          ${dragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}
        onClick={() => document.getElementById('file-input').click()}
      >
        <p className="text-gray-500 text-sm">
          Drag & drop files here or <span className="text-blue-600 underline">browse</span>
        </p>
        <input
          id="file-input"
          type="file"
          multiple
          accept={ACCEPTED}
          className="hidden"
          onChange={handleChange}
        />
      </div>

      {files.length > 0 && (
        <ul className="mt-3 space-y-1 text-sm">
          {files.map((f, i) => (
            <li key={i} className="flex items-center justify-between bg-white border rounded px-3 py-1.5">
              <span className="truncate mr-2">{f.name}</span>
              <button
                onClick={() => remove(i)}
                className="text-red-500 hover:text-red-700 text-xs font-bold"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
