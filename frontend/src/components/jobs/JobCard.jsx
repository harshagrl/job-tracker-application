import { useState } from "react";
import {
  FaBuilding,
  FaUserTie,
  FaHistory,
  FaFileUpload,
  FaTrash,
  FaDownload,
} from "react-icons/fa";
import Timeline from "../timeline/Timeline";
import axios from "axios";

const JobCard = ({ job, onDelete, onStatusChange, onResumeUploadSuccess }) => {
  const [showTimeline, setShowTimeline] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState("");

  const statusColors = {
    applied: "bg-blue-100 text-blue-800",
    interview: "bg-purple-100 text-purple-800",
    offer: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
  };

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setUploadError("");
    setUploadSuccess("");

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/upload/${job._id}/resume`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUploadSuccess("Resume uploaded successfully!");
      if (onResumeUploadSuccess) {
        onResumeUploadSuccess(job._id, {
          filename: file.name,
          contentType: file.type,
        });
      }
    } catch (err) {
      console.error(
        "Resume upload failed:",
        err.response?.data?.error || err.message
      );
      setUploadError(err.response?.data?.error || "Failed to upload resume.");
    } finally {
      setUploading(false);
      e.target.value = null;
    }
  };

  const handleResumeDownload = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/upload/${job._id}/resume`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        job.resume.filename || `resume-${job.company}.pdf`
      );
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(
        "Resume download failed:",
        err.response?.data?.error || err.message
      );
      alert(err.response?.data?.error || "Failed to download resume.");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6 transition-all hover:shadow-lg">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 flex items-center">
              <FaBuilding className="mr-2 text-primary-500" />
              {job.company}
            </h3>
            <p className="text-gray-600 mt-1 flex items-center">
              <FaUserTie className="mr-2 text-secondary-500" />
              {job.role}
            </p>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              statusColors[job.status]
            }`}
          >
            {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
          </span>
        </div>

        <div className="mt-4 flex flex-wrap gap-2 items-center">
          <select
            value={job.status}
            onChange={(e) => onStatusChange(job._id, e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2"
          >
            <option value="applied">Applied</option>
            <option value="interview">Interview</option>
            <option value="offer">Offer</option>
            <option value="rejected">Rejected</option>
          </select>

          <button
            onClick={() => setShowTimeline(!showTimeline)}
            className="flex items-center px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <FaHistory className="mr-2" />
            Timeline
          </button>

          <div className="relative flex items-center">
            <label className="flex items-center px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer">
              {uploading ? (
                "Uploading..."
              ) : (
                <>
                  <FaFileUpload className="mr-2" /> Upload Resume
                </>
              )}
              <input
                type="file"
                className="hidden"
                onChange={handleResumeUpload}
                accept=".pdf,.doc,.docx"
                disabled={uploading}
              />
            </label>
            {uploadError && (
              <p className="text-xs text-danger-500 mt-1">{uploadError}</p>
            )}
            {uploadSuccess && (
              <p className="text-xs text-primary-500 mt-1">{uploadSuccess}</p>
            )}
            {job.resume && job.resume.filename && (
              <button
                onClick={handleResumeDownload}
                className="flex items-center px-3 py-2 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-lg transition-colors ml-2"
                title={`Download ${job.resume.filename}`}
              >
                <FaDownload className="mr-2" />
                {job.resume.filename}
              </button>
            )}
          </div>

          <button
            onClick={() => onDelete(job._id)}
            className="flex items-center px-3 py-2 bg-red-100 hover:bg-red-200 text-red-800 rounded-lg transition-colors"
          >
            <FaTrash className="mr-2" />
            Delete
          </button>
        </div>

        {showTimeline && (
          <div className="mt-4 border-t pt-4">
            <Timeline timeline={job.timeline} />
          </div>
        )}
      </div>
    </div>
  );
};

export default JobCard;
