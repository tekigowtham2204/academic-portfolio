"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload as UploadIcon, FileText, CheckCircle2, AlertCircle } from "lucide-react";
import { uploadFile } from "@/lib/api";

interface UploadResult {
  filename: string;
  chunks: number;
  message: string;
}

export default function UploadPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<UploadResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const data = await uploadFile(file);
      setResult({
        filename: data.filename,
        chunks: data.chunks,
        message: data.message,
      });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setLoading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "text/plain": [".txt"],
    },
    maxFiles: 1,
    disabled: loading,
  });

  return (
    <div className="max-w-2xl mx-auto py-12 md:py-16 px-4 md:px-6">
      <div className="text-center mb-10">
        <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <UploadIcon className="text-orange-500" size={22} />
        </div>
        <h1 className="text-2xl font-extrabold text-gray-900">
          Upload Document
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          ドキュメントをアップロード — PDF or TXT up to 10 MB
        </p>
      </div>

      <div
        {...getRootProps()}
        className={`relative border-2 border-dashed rounded-3xl p-10 md:p-14 text-center cursor-pointer transition-all ${
          isDragActive
            ? "border-brand-400 bg-brand-50 scale-[1.01]"
            : "border-gray-200 hover:border-brand-300 hover:bg-gray-50/50"
        } ${loading ? "opacity-60 pointer-events-none" : ""}`}
      >
        <input {...getInputProps()} />
        {loading ? (
          <div className="space-y-4">
            <div className="w-10 h-10 mx-auto border-3 border-brand-200 border-t-brand-500 rounded-full animate-spin" />
            <p className="text-sm text-gray-500 font-medium">
              Processing… ドキュメントを処理中…
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto">
              <UploadIcon className="text-gray-400" size={24} />
            </div>
            <p className="text-gray-700 font-semibold">
              {isDragActive
                ? "Drop the file here…"
                : "Drag & drop a file here"}
            </p>
            <p className="text-sm text-gray-400">
              or <span className="text-brand-500 font-medium">click to browse</span>
            </p>
            <div className="flex items-center justify-center gap-2 mt-2">
              <span className="text-[11px] bg-red-50 text-red-500 font-semibold rounded-full px-2.5 py-0.5">PDF</span>
              <span className="text-[11px] bg-blue-50 text-blue-500 font-semibold rounded-full px-2.5 py-0.5">TXT</span>
              <span className="text-[11px] text-gray-400">• 最大 10 MB</span>
            </div>
          </div>
        )}
      </div>

      {result && (
        <div className="mt-6 bg-green-50 rounded-2xl p-5 flex items-start gap-3 shadow-card">
          <CheckCircle2 className="text-green-500 mt-0.5 shrink-0" size={20} />
          <div>
            <p className="text-sm font-semibold text-green-800">
              {result.message}
            </p>
            <div className="mt-2 flex items-center gap-2 text-xs text-green-600">
              <FileText size={14} />
              <span>
                {result.filename} — {result.chunks} chunks indexed
              </span>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-6 bg-brand-50 rounded-2xl p-5 flex items-start gap-3 shadow-card">
          <AlertCircle className="text-brand-600 mt-0.5 shrink-0" size={20} />
          <p className="text-sm font-medium text-brand-700">{error}</p>
        </div>
      )}
    </div>
  );
}
