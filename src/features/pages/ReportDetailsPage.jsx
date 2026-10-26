import { useState, useEffect } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { ArrowLeft, Calendar, FileText, User } from "lucide-react";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import PdfViewer from "../components/reports/PdfViewer";
import AiAnalysisPanel from "../components/reports/AiAnalysisPanel";
import { getMedicalReportByIdAPI } from "../reports/api/reports.api";
import { getFamilyMember } from "../familymember/hook/useFamilyMember";

export default function ReportDetailsPage() {
  const { id: memberId, reportId } = useParams();
  const location = useLocation();

  const [report, setReport] = useState(() => location.state?.report || null);
  const [member, setMember] = useState(() => location.state?.member || null);
  const [loading, setLoading] = useState(!report);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        if (!report) {
          setLoading(true);
          const reportData = await getMedicalReportByIdAPI(reportId, memberId);
          if (reportData) {
            setReport(reportData);
          } else {
            setError(true);
          }
        }

        if (!member && memberId) {
          const res = await getFamilyMember();
          const members = res.members || res.data || [];
          const found = members.find(
            (m) => String(m._id || m.id) === String(memberId)
          );
          if (found) setMember(found);
        }
      } catch (err) {
        console.error("Error loading report details:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [reportId, memberId, report, member]);

  const memberName = member
    ? `${member.firstName || ""} ${member.lastName || ""}`.trim()
    : "Family Member";

  const formatDate = (dateString) => {
    if (!dateString) return "Recent";
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return "Recent";
    return d.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-paper">
      <DashboardHeader />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb / Navigation */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <Link
            to={memberId ? `/family-member/${memberId}` : "/dashboard"}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-xs font-medium text-ink-soft shadow-xs transition-colors hover:border-brand hover:text-brand"
          >
            <ArrowLeft size={14} />
            <span>Back to {memberName}'s Profile</span>
          </Link>

          {member && (
            <div className="inline-flex items-center gap-2 rounded-full bg-paper px-3 py-1.5 text-xs text-ink-soft">
              <User size={13} className="text-brand" />
              <span>
                Managing for: <strong className="text-ink">{memberName}</strong> ({member.relation})
              </span>
            </div>
          )}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="h-[600px] animate-pulse rounded-2xl border border-border bg-surface" />
            <div className="h-[600px] animate-pulse rounded-2xl border border-border bg-surface" />
          </div>
        ) : error || !report ? (
          <div className="rounded-2xl border border-border bg-surface px-6 py-16 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-alert-soft text-alert">
              <FileText size={24} />
            </div>
            <h3 className="mt-4 font-display text-lg text-ink">Medical Report Not Found</h3>
            <p className="mx-auto mt-1 max-w-sm text-xs text-ink-soft">
              The requested medical report could not be found or may have been deleted.
            </p>
            <Link
              to={memberId ? `/family-member/${memberId}` : "/dashboard"}
              className="mt-5 inline-block rounded-full bg-brand px-5 py-2.5 text-xs font-medium text-white hover:bg-brand-dark"
            >
              Return to Member Profile
            </Link>
          </div>
        ) : (
          <div>
            {/* Report Header Strip */}
            <div className="mb-6 flex flex-col justify-between gap-4 rounded-2xl border border-border bg-surface p-5 shadow-xs sm:flex-row sm:items-center">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-brand-soft px-3 py-1 text-xs font-medium text-brand-dark">
                    {report.recordType || "Diagnostic Report"}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-ink-soft">
                    <Calendar size={13} />
                    {formatDate(report.recordDate || report.createdAt)}
                  </span>
                </div>
                <h1 className="mt-2 font-display text-xl text-ink sm:text-2xl">
                  {report.fileName || "Medical Document"}
                </h1>
              </div>
            </div>

            {/* Two-Column Responsive Layout: Left PDF, Right AI Analysis */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start">
              {/* Left Column: PDF Viewer */}
              <div className="w-full">
                <PdfViewer
                  fileUrl={report.fileUrl}
                  fileName={report.fileName}
                />
              </div>

              {/* Right Column: AI Report Analysis */}
              <div className="w-full">
                <AiAnalysisPanel
                  report={report}
                  reportId={report._id || report.id || reportId}
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

