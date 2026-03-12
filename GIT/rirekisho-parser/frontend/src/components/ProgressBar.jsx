export default function ProgressBar({ completed, total, failures }) {
  if (total === 0) return null;
  const pct = Math.round((completed / total) * 100);

  return (
    <div className="mb-4">
      <div className="flex justify-between text-xs text-gray-600 mb-1">
        <span>Processing {completed} / {total}</span>
        {failures > 0 && <span className="text-red-500">{failures} failed</span>}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className="bg-blue-600 h-3 rounded-full transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
