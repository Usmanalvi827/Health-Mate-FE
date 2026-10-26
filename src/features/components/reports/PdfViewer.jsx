import { useState } from "react";
import { FileText, ExternalLink, Download, AlertCircle, Loader2 } from "lucide-react";

export default function PdfViewer({ fileUrl, fileName = "Medical Report.pdf" }) {
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(!fileUrl);

  const isPdf =
    !fileUrl ||
    fileUrl.toLowerCase().includes(".pdf") ||
    fileUrl.startsWith("blob:") ||
    fileUrl.includes("raw/upload");

  return (
    <div className="flex h-[600px] flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-sm lg:h-[780px]">
      {/* Viewer Header / Toolbar */}
      <div className="flex items-center justify-between border-b border-border bg-paper/60 px-4 py-3">
        <div className="flex items-center gap-2.5 overflow-hidden pr-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-soft text-brand-dark">
            <FileText size={16} />
          </div>
          <span
            title={fileName}
            className="truncate text-xs font-medium text-ink sm:text-sm"
          >
            {fileName}
          </span>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {fileUrl && (
            <>
              <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-2.5 py-1.5 text-xs font-medium text-ink-soft transition-colors hover:border-brand hover:text-brand"
                title="Open in new window"
              >
                <ExternalLink size={14} />
                <span className="hidden sm:inline">New Tab</span>
              </a>

              <a
                href={fileUrl}
                download={fileName}
                className="inline-flex items-center gap-1.5 rounded-lg bg-brand px-2.5 py-1.5 text-xs font-medium text-white transition-colors hover:bg-brand-dark"
                title="Download Document"
              >
                <Download size={14} />
                <span className="hidden sm:inline">Download</span>
              </a>
            </>
          )}
        </div>
      </div>

      {/* Viewer Body */}
      <div className="relative flex-1 bg-paper/30">
        {loading && fileUrl && !hasError && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-surface/80 backdrop-blur-xs">
            <Loader2 size={32} className="animate-spin text-brand" />
            <p className="mt-3 text-xs font-medium text-ink-soft">
              Loading document preview...
            </p>
          </div>
        )}

        {fileUrl && !hasError ? (
          isPdf ? (
            <iframe
              src={`${fileUrl}#toolbar=1&navpanes=0&view=FitH`}
              title={fileName}
              className="h-full w-full border-none"
              onLoad={() => setLoading(false)}
              onError={() => {
                setLoading(false);
                setHasError(true);
              }}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center overflow-auto p-4">
              <img
                src={fileUrl}
                alt={fileName}
                className="max-h-full max-w-full rounded-lg object-contain shadow-sm"
                onLoad={() => setLoading(false)}
                onError={() => {
                  setLoading(false);
                  setHasError(true);
                }}
              />
            </div>
          )
        ) : (
          <div className="flex h-full flex-col items-center justify-center p-8 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-paper text-ink-soft">
              <AlertCircle size={28} />
            </div>
            <h3 className="mt-4 font-display text-lg text-ink">
              Preview Not Available In-App
            </h3>
            <p className="mx-auto mt-1.5 max-w-xs text-xs text-ink-soft">
              The document cannot be embedded directly in this browser frame. You can view or download it directly.
            </p>
            {fileUrl && (
              <div className="mt-5 flex gap-3">
                <a
                  href={fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-brand px-4 py-2 text-xs font-medium text-white hover:bg-brand-dark"
                >
                  <ExternalLink size={14} />
                  Open in New Tab
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

