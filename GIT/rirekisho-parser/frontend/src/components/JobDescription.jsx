export default function JobDescription({ value, onChange }) {
  return (
    <div>
      <label htmlFor="jd" className="block text-sm font-semibold text-gray-700 mb-1">
        Job Description
      </label>
      <textarea
        id="jd"
        rows={6}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste the job description here…"
        className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none resize-y"
      />
    </div>
  );
}
