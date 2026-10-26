import { api } from "../../../lib/apiClient";

const STORAGE_PREFIX = "hm_medical_reports_";
const ANALYSIS_STORAGE_PREFIX = "hm_ai_analysis_";

// Helper to get local stored reports for a member
export function getLocalReports(memberId) {
  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}${memberId}`);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

// Helper to save a report locally to ensure immediate persistence
export function saveLocalReport(memberId, report) {
  try {
    const existing = getLocalReports(memberId);
    const filtered = existing.filter(
      (r) => String(r._id || r.id) !== String(report._id || report.id)
    );
    const updated = [report, ...filtered];
    localStorage.setItem(`${STORAGE_PREFIX}${memberId}`, JSON.stringify(updated));
    return updated;
  } catch (error) {
    console.error("Failed to save report to local storage:", error);
    return [];
  }
}

// Helper to get cached AI analysis
export function getCachedAnalysis(reportId) {
  try {
    const raw = localStorage.getItem(`${ANALYSIS_STORAGE_PREFIX}${reportId}`);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

// Helper to save cached AI analysis
export function saveCachedAnalysis(reportId, analysis) {
  try {
    localStorage.setItem(
      `${ANALYSIS_STORAGE_PREFIX}${reportId}`,
      JSON.stringify(analysis)
    );
  } catch (error) {
    console.error("Failed to cache AI analysis:", error);
  }
}

/**
 * Upload a medical report file (PDF/Image) for a specific family member
 * Endpoint: POST /api/upload-medical-report
 */
export async function uploadMedicalReportAPI({
  file,
  memberId,
  recordType = "Lab Report",
  recordDate,
}) {
  const formData = new FormData();
  formData.append("medicalReport", file);
  formData.append("member", memberId);
  formData.append("recordType", recordType);
  if (recordDate) {
    formData.append("recordDate", recordDate);
  }

  const response = await api.post("/api/upload-medical-report", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}

/**
 * Poll job status in BullMQ queue
 * Endpoint: GET /api/medical-report/status/:jobId
 */
export async function getJobStatusAPI(jobId) {
  const response = await api.get(`/api/medical-report/status/${jobId}`);
  return response.data;
}

/**
 * Request AI analysis for a processed medical record
 * Endpoint: POST /api/ai-analysis/:id
 */
export async function analyzeReportAPI(reportId) {
  const response = await api.post(`/api/ai-analysis/${reportId}`);
  if (response.data?.data) {
    saveCachedAnalysis(reportId, response.data.data);
  }
  return response.data;
}

/**
 * Fetch medical reports for a family member.
 * Tries backend route if implemented, and blends with local persistence.
 */
export async function getMemberReportsAPI(memberId) {
  let backendReports = [];

  // Attempt backend endpoint if backend provides one
  try {
    const response = await api.get(`/api/medical-records?member=${memberId}`);
    if (Array.isArray(response.data?.records)) {
      backendReports = response.data.records;
    } else if (Array.isArray(response.data?.data)) {
      backendReports = response.data.data;
    } else if (Array.isArray(response.data)) {
      backendReports = response.data;
    }
  } catch {
    // Backend listing endpoint not yet implemented or returned 404
  }

  // Combine backend reports and locally stored uploaded reports
  const localReports = getLocalReports(memberId);
  const seenIds = new Set();
  const merged = [];

  for (const report of [...backendReports, ...localReports]) {
    const id = String(report._id || report.id);
    if (!seenIds.has(id)) {
      seenIds.add(id);
      merged.push(report);
    }
  }

  return merged;
}

/**
 * Fetch a single report by ID
 */
export async function getMedicalReportByIdAPI(reportId, memberId) {
  // First try backend
  try {
    const response = await api.get(`/api/medical-records/${reportId}`);
    if (response.data?.data || response.data?.record) {
      return response.data.data || response.data.record;
    }
  } catch {
    // Backend single record endpoint pending
  }

  // Fallback to local storage
  if (memberId) {
    const local = getLocalReports(memberId);
    const found = local.find((r) => String(r._id || r.id) === String(reportId));
    if (found) return found;
  }

  // Scan all local storage keys as fallback
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith(STORAGE_PREFIX)) {
      try {
        const list = JSON.parse(localStorage.getItem(key) || "[]");
        const found = list.find((r) => String(r._id || r.id) === String(reportId));
        if (found) return found;
      } catch {
        // ignore JSON parse errors
      }
    }
  }

  return null;
}

