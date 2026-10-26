import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  FileText,
  UploadCloud,
  ArrowRight,
  Calendar,
  Sparkles,
  AlertCircle,
} from "lucide-react";
import { getMemberReportsAPI } from "../../reports/api/reports.api";
import UploadReportModal from "./UploadReportModal";

export default function MemberReportsSection({ member }) {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const memberId = member?._id || member?.id;

  const fetchReports = useCallback(async () => {
    if (!memberId) return;
    try {
      setLoading(true);
      setLoadError(false);
      const data = await getMemberReportsAPI(memberId);
      setReports(data || []);
    } catch (err) {
      console.error("Failed to fetch reports:", err);
      setLoadError(true);
    } finally {
      setLoading(false);
    }
  }, [memberId]);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  const formatDate = (dateString) => {
    if (!dateString) return "Recent";
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return "Recent";
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <section className="mt-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-xl text-ink">Medical Reports</h2>
          <p className="mt-1 text-sm text-ink-soft">
            Diagnostic lab tests, imaging, and prescriptions for {member?.firstName || "this member"}.
          </p>
        </div>

        <button
          onClick={() => setIsUploadOpen(true)}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-brand px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-dark"
        >
          <UploadCloud size={16} />
          Upload Report
        </button>
      </div>

      <div className="mt-5">
        {loading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="animate-pulse rounded-2xl border border-border bg-surface p-5"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-paper" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-3/4 rounded bg-paper" />
                    <div className="h-3 w-1/2 rounded bg-paper" />
                  </div>
                </div>
                <div className="mt-5 h-8 rounded bg-paper" />
              </div>
            ))}
          </div>
        ) : loadError ? (
          <div className="rounded-2xl border border-border bg-surface p-8 text-center">
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-alert-soft text-alert">
              <AlertCircle size={22} />
            </div>
            <p className="mt-3 text-sm font-medium text-ink">Unable to load medical reports</p>
            <p className="mt-1 text-xs text-ink-soft">
              Could not retrieve reports at this time.
            </p>
            <button
              onClick={fetchReports}
              className="mt-4 rounded-full bg-brand px-4 py-2 text-xs font-medium text-white hover:bg-brand-dark"
            >
              Try Again
            </button>
          </div>
        ) : reports.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-surface px-6 py-12 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-soft text-brand">
              <FileText size={24} />
            </div>
            <h3 className="mt-3 font-display text-lg text-ink">No medical reports yet</h3>
            <p className="mx-auto mt-1 max-w-sm text-sm text-ink-soft">
              Upload blood tests, prescriptions, or imaging reports to keep an organized timeline and get AI explanations.
            </p>
            <button
              onClick={() => setIsUploadOpen(true)}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-dark"
            >
              <UploadCloud size={16} />
              Upload First Report
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {reports.map((report) => {
              const reportId = report._id || report.id;
              const hasAi = report.aiStatus === "done";
              const isProcessing =
                report.aiStatus === "extracting" || report.aiStatus === "pending";

              return (
                <div
                  key={reportId}
                  className="shadow-card group relative flex flex-col justify-between rounded-2xl border border-border bg-surface p-5 transition-all hover:border-brand/40"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand-dark">
                        <FileText size={20} />
                      </div>

                      <div className="flex flex-wrap items-center justify-end gap-1.5">
                        <span className="inline-block rounded-full bg-paper px-2.5 py-0.5 text-[11px] font-medium capitalize text-ink-soft">
                          {report.recordType || "Medical Report"}
                        </span>
                        {hasAi && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
                            <Sparkles size={11} />
                            Analyzed
                          </span>
                        )}
                        {isProcessing && (
                          <span className="inline-block rounded-full bg-accent-soft px-2 py-0.5 text-[11px] font-medium text-accent">
                            Processing
                          </span>
                        )}
                      </div>
                    </div>

                    <h3
                      title={report.fileName}
                      className="mt-4 truncate font-medium text-ink transition-colors group-hover:text-brand"
                    >
                      {report.fileName || "Medical Document"}
                    </h3>

                    <div className="mt-2 flex items-center gap-1.5 text-xs text-ink-soft">
                      <Calendar size={13} />
                      <span>{formatDate(report.recordDate || report.createdAt)}</span>
                    </div>
                  </div>

                  <div className="mt-5 border-t border-border pt-3">
                    <Link
                      to={`/family-member/${memberId}/report/${reportId}`}
                      state={{ report, member }}
                      className="inline-flex w-full items-center justify-between text-sm font-medium text-brand hover:text-brand-dark"
                    >
                      <span>View Report & AI</span>
                      <ArrowRight
                        size={15}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <UploadReportModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        member={member}
        onSuccess={fetchReports}
      />
    </section>
  );
}
