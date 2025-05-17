import React, { useState, useEffect } from "react";
import API_URL from "../config/api";
import "./FileList.css";

const FileList = ({ jobId }) => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [downloadingId, setDownloadingId] = useState(null);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_URL}/api/files/job/${jobId}`, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to Fetch Files");
        }

        const data = await response.json();
        setFiles(data);
        setError("");
      } catch (error) {
        setFiles([]);
        console.error("Error fetching files:", error);
        setError(
          "Failed to fetch file. Please try again later" || error.message
        );
      } finally {
        setLoading(false);
      }
    };
    if (jobId) {
      fetchFiles();
    }
  }, [jobId]);

  const formatFileSize = (bytes) => {
    if (bytes < 1024) {
      return bytes + "B";
    } else if (bytes < 1024 * 1024) {
      return (bytes / 1024).toFixed(1) + "KB";
    } else {
      return (bytes / (1024 * 1024)).toFixed(1) + "MB";
    }
  };

  const formatDate = (date) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const handleDownload = async (fileId, filename) => {
    try {
      setDownloadingId(fileId);

      const response = await fetch(`${API_URL}/api/files/download/${fileId}`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to Download File");
      }

      // create blob from response
      const blob = await response.blob();

      // temp anchor element
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = filename;

      // add to DOM, trigger click and then remove
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading file:", error);
      alert("Failed to Download File. Please Try Again Later");
    } finally {
      setDownloadingId(null);
    }
  };

  const handleDeleteFile = async (fileId) => {
    if (
      !window.confirm(
        "This will delete the file. Are you sure you wish to proceed?"
      )
    ) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/files/delete/${fileId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to delete the file");
      }

      //update files list
      setFiles(files.filter((file) => file._id !== fileId));
    } catch (error) {
      console.error("Error deleting file:", error);
      alert("Failed to delete the file. Please try again later");
    }
  };

  if (loading) {
    return <section className="files-loading">Loading files...</section>;
  }

  if (error) {
    return <section className="files-error">{error}</section>;
  }

  return (
    <section className="file-list-container">
      <h3>Project Files</h3>

      {files.length === 0 ? (
        <p className="no-files-message">
          No files have been uploaded for this project yet.
        </p>
      ) : (
        <section className="files-table-container">
          <table className="files-table">
            <thead>
              <tr>
                <th>File Name</th>
                <th>Size</th>
                <th>Uploaded</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file) => (
                <tr key={file._id} className="file-item">
                  <td className="file-name">{file.originalName}</td>
                  <td className="file-size">{formatFileSize(file.fileSize)}</td>
                  <td className="file-date">{formatDate(file.createdAt)}</td>
                  <td className="file-actions">
                    <button
                      className="download-button"
                      onClick={() =>
                        handleDownload(file._id, file.originalName)
                      }
                      disabled={downloadingId === file._id}
                    >
                      {downloadingId === file._id
                        ? "Downloading..."
                        : "Download"}
                    </button>

                    {
                      <button
                        className="delete-button"
                        onClick={() => handleDeleteFile(file._id)}
                      >
                        Delete
                      </button>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
    </section>
  );
};

export default FileList;
