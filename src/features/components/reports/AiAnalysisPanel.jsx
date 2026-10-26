import { useState, useEffect } from "react";
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Stethoscope,
  Activity,
  RotateCw,
  Info,
  ChevronRight,
} from "lucide-react";
import { toast } from "react-toastify";
import {
  analyzeReportAPI,
  getCachedAnalysis,
} from "../../reports/api/reports.api";

export default function AiAnalysisPanel({ report, reportId }) {
  const [analysis, setAnalysis] = useState(() => getCachedAnalysis(reportId));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [summaryLang, setSummaryLang] = useState("english"); // 'english' | 'romanUrdu'

  useEffect(() => {
    // If reportId changes, check cache
    const cached = getCachedAnalysis(reportId);
    if (cached) {
      setAnalysis(cached);
      setError(null);
    }
  }, [reportId]);

  const handleAnalyze = async () => {
    if (!reportId) {
      toast.error("Valid report ID is required for AI analysis.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await analyzeReportAPI(reportId);
      if (res.success && res.data) {
        setAnalysis(res.data);
        toast.success("AI Analysis completed successfully!");
      } else {
        throw new Error(res.message || "Failed to generate AI analysis");
      }
    } catch (err) {
      console.error("Analysis request failed:", err);
      const status = err?.response?.status;
      let msg = err?.response?.data?.message || "AI Analysis could not be completed.";

      if (status === 409) {
        msg = "Report text extraction is still in progress. Please wait a few seconds and try again.";
      } else if (status === 415) {
        msg = "Unsupported report file format for automated analysis.";
      } else if (status === 503) {
        msg = "AI Analysis service is currently offline or not configured.";
      }

      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "normal":
        return (
          <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-medium capitalize text-emerald-700">
            Normal
          </span>
        );
      case "high":
        return (
          <span className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-xs font-medium capitalize text-amber-700">
            High
          </span>
        );
      case "low":
        return (
          <span className="inline-flex items-center rounded-full border border-sky-200 bg-sky-50 px-2.5 py-0.5 text-xs font-medium capitalize text-sky-700">
            Low
          </span>
        );
      case "abnormal":
        return (
          <span className="inline-flex items-center rounded-full border border-rose-200 bg-rose-50 px-2.5 py-0.5 text-xs font-medium capitalize text-rose-700">
            Abnormal
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center rounded-full border border-border bg-paper px-2.5 py-0.5 text-xs font-medium capitalize text-ink-soft">
            {status || "Note"}
          </span>
        );
    }
  };

  return (
    <div className="flex h-[600px] flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-sm lg:h-[780px]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border bg-paper/60 px-5 py-3.5">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-white">
            <Sparkles size={16} />
          </div>
          <div>
            <h2 className="font-display text-sm font-semibold text-ink sm:text-base">
              AI Medical Analysis
            </h2>
          </div>
        </div>

        {analysis && (
          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-2.5 py-1 text-xs font-medium text-ink-soft transition-colors hover:border-brand hover:text-brand disabled:opacity-50"
            title="Re-run analysis"
          >
            <RotateCw size={12} className={loading ? "animate-spin" : ""} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        )}
      </div>

      {/* Body Area */}
      <div className="flex-1 overflow-y-auto p-5 sm:p-6">
        {loading ? (
          <div className="flex h-full flex-col items-center justify-center p-6 text-center">
            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-soft text-brand">
              <Sparkles size={32} className="animate-pulse" />
              <div className="absolute -inset-1 rounded-2xl border-2 border-brand/30 animate-ping" />
            </div>
            <h3 className="mt-5 font-display text-lg text-ink">Analyzing Medical Report</h3>
            <p className="mx-auto mt-2 max-w-xs text-xs text-ink-soft">
              Gemini AI is reading clinical biomarkers, summarizing results, and generating questions for your doctor...
            </p>
          </div>
        ) : error ? (
          <div className="flex h-full flex-col items-center justify-center p-6 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-alert-soft text-alert">
              <AlertTriangle size={24} />
            </div>
            <h3 className="mt-3 font-display text-base text-ink">Analysis Unavailable</h3>
            <p className="mx-auto mt-1 max-w-sm text-xs text-ink-soft">{error}</p>
            <button
              onClick={handleAnalyze}
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2 text-xs font-medium text-white transition-colors hover:bg-brand-dark"
            >
              <RotateCw size={14} />
              Retry Analysis
            </button>
          </div>
        ) : !analysis ? (
          <div className="flex h-full flex-col items-center justify-center p-6 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-soft text-brand">
              <Sparkles size={28} />
            </div>
            <h3 className="mt-4 font-display text-lg text-ink">
              Ready for AI Explanation
            </h3>
            <p className="mx-auto mt-2 max-w-sm text-xs text-ink-soft">
              Analyze this document to get easy-to-understand summaries, flagged clinical values, and questions for your doctor.
            </p>
            <button
              onClick={handleAnalyze}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-brand-dark hover:shadow-md"
            >
              <Sparkles size={16} />
              Analyze Report
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Top Banner / Report Type */}
            <div className="rounded-xl border border-brand/20 bg-brand-soft/40 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-brand-dark">
                    Document Category
                  </span>
                  <h3 className="font-display text-lg font-medium text-ink">
                    {analysis.reportType || report?.recordType || "Clinical Report"}
                  </h3>
                </div>
                <span className="rounded-full bg-surface px-3 py-1 text-xs font-medium text-brand shadow-xs">
                  AI Verified
                </span>
              </div>
            </div>

            {/* Summary Section with English / Roman Urdu Switcher */}
            <div className="rounded-2xl border border-border bg-surface p-4 shadow-xs sm:p-5">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div className="flex items-center gap-2">
                  <Activity size={16} className="text-brand" />
                  <h4 className="font-display text-sm font-semibold text-ink">
                    Executive Summary
                  </h4>
                </div>

                {analysis.summary?.romanUrdu && (
                  <div className="flex rounded-lg border border-border bg-paper p-0.5 text-xs">
                    <button
                      onClick={() => setSummaryLang("english")}
                      className={`rounded-md px-2.5 py-1 font-medium transition-all ${
                        summaryLang === "english"
                          ? "bg-surface text-ink shadow-xs"
                          : "text-ink-soft hover:text-ink"
                      }`}
                    >
                      English
                    </button>
                    <button
                      onClick={() => setSummaryLang("romanUrdu")}
                      className={`rounded-md px-2.5 py-1 font-medium transition-all ${
                        summaryLang === "romanUrdu"
                          ? "bg-surface text-ink shadow-xs"
                          : "text-ink-soft hover:text-ink"
                      }`}
                    >
                      Roman Urdu
                    </button>
                  </div>
                )}
              </div>

              <p className="mt-3 text-xs leading-relaxed text-ink-soft sm:text-sm">
                {summaryLang === "romanUrdu" && analysis.summary?.romanUrdu
                  ? analysis.summary.romanUrdu
                  : analysis.summary?.english ||
                    (typeof analysis.summary === "string" ? analysis.summary : "No summary provided.")}
              </p>
            </div>

            {/* Key Clinical Findings */}
            {Array.isArray(analysis.findings) && analysis.findings.length > 0 && (
              <div>
                <h4 className="font-display text-sm font-semibold text-ink">
                  Key Biomarkers & Findings
                </h4>
                <div className="mt-3 space-y-2.5">
                  {analysis.findings.map((finding, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl border border-border bg-paper/40 p-3.5 transition-colors hover:border-brand/40"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-medium text-xs text-ink sm:text-sm">
                          {finding.name}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-xs text-ink sm:text-sm">
                            {finding.value} {finding.unit || ""}
                          </span>
                          {getStatusBadge(finding.status)}
                        </div>
                      </div>
                      {finding.explanation && (
                        <p className="mt-1.5 text-xs text-ink-soft">
                          {finding.explanation}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Clinical Observations */}
            {Array.isArray(analysis.observations) && analysis.observations.length > 0 && (
              <div className="rounded-2xl border border-border bg-surface p-4 sm:p-5">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-brand" />
                  <h4 className="font-display text-sm font-semibold text-ink">
                    Clinical Observations
                  </h4>
                </div>
                <ul className="mt-3 space-y-2">
                  {analysis.observations.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-ink-soft sm:text-sm">
                      <ChevronRight size={15} className="mt-0.5 shrink-0 text-brand" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Doctor Discussion Points */}
            {Array.isArray(analysis.doctorDiscussionPoints) &&
              analysis.doctorDiscussionPoints.length > 0 && (
                <div className="rounded-2xl border border-accent/20 bg-accent-soft/30 p-4 sm:p-5">
                  <div className="flex items-center gap-2 text-accent">
                    <Stethoscope size={16} />
                    <h4 className="font-display text-sm font-semibold text-ink">
                      Questions to Ask Your Doctor
                    </h4>
                  </div>
                  <ul className="mt-3 space-y-2">
                    {analysis.doctorDiscussionPoints.map((point, idx) => (
                      <li
                        key={idx}
                        className="rounded-xl border border-border/60 bg-surface/80 p-3 text-xs font-medium text-ink shadow-xs sm:text-sm"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            {/* Medical Disclaimer */}
            <div className="flex items-start gap-2.5 rounded-xl border border-border bg-paper p-3 text-[11px] text-ink-soft">
              <Info size={15} className="mt-0.5 shrink-0 text-ink-soft" />
              <span>
                <strong>Medical Notice:</strong> This analysis is generated by AI to help you understand your reports. It does not constitute medical advice or a doctor's diagnosis. Always consult with a qualified healthcare professional.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
