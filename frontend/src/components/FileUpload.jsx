import React, { useState } from "react";
import API_URL from "../config/api";
import "./FileUpload.css";

const FileUpload = ({ jobId, onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      //check size limit
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError("File Exceeds Maximum Size Limit (5 MB)");
        e.target.value = null; //reset input
        return;
      }

      setFile(selectedFile);
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setError("Please Select a File to Upload");
      return;
    }

    setUploading(true);
    setProgress(0);
    setError("");

    const formData = new FormData();

    formData.append("file", file);

    try {
      // update progress
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 300); // we are straight up lying here but they won't know fr

      const response = await fetch(`${API_URL}/api/files/upload/${jobId}`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      clearInterval(progressInterval);

      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          error.message || "Failed to Upload File - Try Again Later"
        );
      }

      setProgress(100);
      const data = await response.json();
      setFile(null);

      setTimeout(() => {
        setFile(null);
        setUploading(false);
        setProgress(0);

        if (onUploadSuccess) {
          onUploadSuccess(data.file);
        }
      }, 500);
    } catch (error) {
      console.error("Error Uploading File:", error);
      setError(error.message || "Failed to Upload File");
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <section className="file-upload-container">
      <h3>Upload Project File</h3>

      <form onSubmit={handleSubmit} className="file-upload-form">
        <section className="form-group">
          <label htmlFor="file">Select File (Max 5 MB)</label>
          <input
            type="file"
            id="file"
            onChange={handleFileChange}
            disabled={uploading}
            className="file-input"
          />
        </section>

        {uploading && (
          <section className="progress-container">
            <section
              className="progress-bar"
              style={{ width: `${progress}%` }}
            />
            <span className="progress-text">{progress}%</span>
          </section>
        )}

        {error && <p className="error-message">{error}</p>}

        <button
          type="submit"
          disabled={uploading || !file}
          className="upload-button"
        >
          {uploading ? "Uploading..." : "Upload File"}
        </button>
      </form>
    </section>
  );
};

export default FileUpload;
