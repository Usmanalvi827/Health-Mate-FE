import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, UploadCloud, FileText, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import {
  uploadMedicalReportAPI,
  getJobStatusAPI,
  saveLocalReport,
} from "../../reports/api/reports.api";

const RECORD_TYPES = [
  "Lab Report",
  "Prescription",
  "X-Ray",
  "CT Scan",
  "MRI",
  "Ultrasound",
  "Other",
];

export default function UploadReportModal({ isOpen, onClose, member, onSuccess }) {
  const [file, setFile] = useState(null);
  const [recordType, setRecordType] = useState("Lab Report");
  const [recordDate, setRecordDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [uploadStatus, setUploadStatus] = useState("idle"); // 'idle' | 'uploading' | 'processing' | 'done' | 'error'
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef(null);

  if (!member) return null;
  const memberId = member._id || member.id;

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (selected) {
      if (selected.size > 15 * 1024 * 1024) {
        toast.warning("File size exceeds 15MB limit.");
        return;
      }
      setFile(selected);
      setErrorMessage("");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const dropped = e.dataTransfer.files?.[0];
    if (dropped) {
      if (dropped.size > 15 * 1024 * 1024) {
        toast.warning("File size exceeds 15MB limit.");
        return;
      }
      setFile(dropped);
      setErrorMessage("");
    }
  };

  const pollJobStatus = async (jobId, fallbackReportData) => {
    const maxAttempts = 30; // 30 * 1.5s = ~45s timeout
    let attempts = 0;

    const interval = setInterval(async () => {
      attempts++;
      try {
        const statusRes = await getJobStatusAPI(jobId);

        if (statusRes.state === "completed") {
          clearInterval(interval);
          setUploadStatus("done");
          setStatusMessage("Report processed and ready!");

          const finalReport = {
            _id: statusRes.result?.recordId || `rec_${Date.now()}`,
            fileName: fallbackReportData.fileName,
            fileUrl: fallbackReportData.fileUrl || "",
            recordType: fallbackReportData.recordType,
            recordDate: fallbackReportData.recordDate,
            fileType: fallbackReportData.fileType,
            member: memberId,
            aiStatus: "extracted",
            createdAt: new Date().toISOString(),
          };

          saveLocalReport(memberId, finalReport);
          toast.success("Medical report uploaded successfully!");

          setTimeout(() => {
            onClose();
            onSuccess?.(finalReport);
            resetForm();
          }, 800);
        } else if (statusRes.state === "failed") {
          clearInterval(interval);
          setUploadStatus("error");
          setErrorMessage(statusRes.error || "Text extraction failed on server.");
        } else {
          setStatusMessage(
            statusRes.state === "active"
              ? "Extracting report text & running OCR..."
              : "Queued for processing..."
          );
        }
      } catch (err) {
        console.error("Job status check error:", err);
        // Do not fail immediately on one failed network poll; wait until timeout
      }

      if (attempts >= maxAttempts) {
        clearInterval(interval);
        // Even if worker is still running, save report as pending
        const partialReport = {
          _id: `rec_${Date.now()}`,
          fileName: fallbackReportData.fileName,
          fileUrl: fallbackReportData.fileUrl || "",
          recordType: fallbackReportData.recordType,
          recordDate: fallbackReportData.recordDate,
          fileType: fallbackReportData.fileType,
          member: memberId,
          aiStatus: "pending",
          createdAt: new Date().toISOString(),
        };
        saveLocalReport(memberId, partialReport);
        setUploadStatus("done");
        toast.info("Report uploaded! Extraction is continuing in background.");
        setTimeout(() => {
          onClose();
          onSuccess?.(partialReport);
          resetForm();
        }, 1000);
      }
    }, 1500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.warning("Please select a medical report file (PDF or image).");
      return;
    }

    setUploadStatus("uploading");
    setStatusMessage("Uploading file to secure medical cloud...");
    setErrorMessage("");

    try {
      const uploadRes = await uploadMedicalReportAPI({
        file,
        memberId,
        recordType,
        recordDate,
      });

      if (uploadRes.success && uploadRes.jobId) {
        setUploadStatus("processing");
        setStatusMessage("Queued in processing pipeline...");

        pollJobStatus(uploadRes.jobId, {
          fileName: file.name,
          recordType,
          recordDate,
          fileType: file.type,
          fileUrl: URL.createObjectURL(file), // temporary preview fallback if Cloudinary is processing
        });
      } else {
        throw new Error(uploadRes.message || "Failed to initiate report processing.");
      }
    } catch (error) {
      console.error("Upload failed:", error);
      setUploadStatus("error");
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        "Unable to upload medical report. Please check your connection.";
      setErrorMessage(msg);
      toast.error(msg);
    }
  };

  const resetForm = () => {
    setFile(null);
    setRecordType("Lab Report");
    setRecordDate(new Date().toISOString().split("T")[0]);
    setUploadStatus("idle");
    setStatusMessage("");
    setErrorMessage("");
  };

  const handleModalClose = () => {
    if (uploadStatus === "uploading" || uploadStatus === "processing") {
      if (!window.confirm("Upload is currently in progress. Are you sure you want to exit?")) {
        return;
      }
    }
    resetForm();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4 backdrop-blur-sm"
          onClick={handleModalClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg rounded-2xl border border-border bg-surface p-6 shadow-xl sm:p-8"
          >
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div>
                <h2 className="font-display text-xl text-ink">Upload Medical Report</h2>
                <p className="mt-0.5 text-xs text-ink-soft">
                  For {member.firstName} {member.lastName}
                </p>
              </div>
              <button
                type="button"
                onClick={handleModalClose}
                className="rounded-full p-1.5 text-ink-soft transition-colors hover:bg-paper hover:text-ink"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              {/* File Dropzone */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
                  Report Document (PDF or Image)
                </label>
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`mt-1.5 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 text-center transition-all ${
                    file
                      ? "border-brand bg-brand-soft/40"
                      : "border-border bg-paper/50 hover:border-brand/60 hover:bg-paper"
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.png,.jpg,.jpeg,application/pdf,image/png,image/jpeg"
                    className="hidden"
                    onChange={handleFileChange}
                    disabled={uploadStatus === "uploading" || uploadStatus === "processing"}
                  />
                  {file ? (
                    <div className="flex flex-col items-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-soft text-brand-dark">
                        <FileText size={24} />
                      </div>
                      <p className="mt-2 text-sm font-medium text-ink">{file.name}</p>
                      <p className="text-xs text-ink-soft">
                        {(file.size / 1024 / 1024).toFixed(2)} MB • Click to replace
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-soft text-brand">
                        <UploadCloud size={24} />
                      </div>
                      <p className="mt-2 text-sm font-medium text-ink">
                        Click or drag & drop PDF report
                      </p>
                      <p className="text-xs text-ink-soft">
                        Supports PDF, PNG, JPG up to 15MB
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Record Type and Date */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="recordTypeSelect"
                    className="text-xs font-semibold uppercase tracking-wider text-ink-soft"
                  >
                    Report Type
                  </label>
                  <select
                    id="recordTypeSelect"
                    value={recordType}
                    onChange={(e) => setRecordType(e.target.value)}
                    disabled={uploadStatus === "uploading" || uploadStatus === "processing"}
                    className="mt-1.5 w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-sm text-ink outline-none focus:border-brand focus:ring-2 focus:ring-brand-soft"
                  >
                    {RECORD_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="recordDateInput"
                    className="text-xs font-semibold uppercase tracking-wider text-ink-soft"
                  >
                    Record Date
                  </label>
                  <input
                    id="recordDateInput"
                    type="date"
                    value={recordDate}
                    onChange={(e) => setRecordDate(e.target.value)}
                    disabled={uploadStatus === "uploading" || uploadStatus === "processing"}
                    className="mt-1.5 w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-sm text-ink outline-none focus:border-brand focus:ring-2 focus:ring-brand-soft"
                  />
                </div>
              </div>

              {/* Status Indicator */}
              {(uploadStatus === "uploading" || uploadStatus === "processing") && (
                <div className="rounded-xl border border-brand/20 bg-brand-soft/50 p-3.5">
                  <div className="flex items-center gap-3 text-sm text-brand-dark">
                    <Loader2 size={18} className="animate-spin text-brand" />
                    <span className="font-medium">{statusMessage}</span>
                  </div>
                </div>
              )}

              {uploadStatus === "done" && (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3.5">
                  <div className="flex items-center gap-3 text-sm text-emerald-800">
                    <CheckCircle2 size={18} className="text-emerald-600" />
                    <span className="font-medium">{statusMessage}</span>
                  </div>
                </div>
              )}

              {uploadStatus === "error" && (
                <div className="rounded-xl border border-alert/30 bg-alert-soft/60 p-3.5">
                  <div className="flex items-center gap-3 text-sm text-alert">
                    <AlertCircle size={18} className="shrink-0" />
                    <span className="font-medium">{errorMessage}</span>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="mt-6 flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleModalClose}
                  disabled={uploadStatus === "uploading" || uploadStatus === "processing"}
                  className="flex-1 rounded-full border border-border py-2.5 text-sm font-medium text-ink transition-colors hover:border-ink-soft disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!file || uploadStatus === "uploading" || uploadStatus === "processing"}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-brand py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {uploadStatus === "uploading" || uploadStatus === "processing" ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    "Upload & Process"
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

