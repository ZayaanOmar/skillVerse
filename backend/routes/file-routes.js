const express = require("express");
const router = express.Router();
const File = require("../models/File");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const ServiceRequest = require("../models/ServiceRequest");

//setup multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, "../uploads");

    // Create the directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueName =
      Date.now() + "-" + file.originalname + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

//upload file endpoint
router.post("/upload/:jobId", upload.single("file"), async (req, res) => {
  try {
    const { jobId } = req.params;

    //check if job exists
    const job = await ServiceRequest.findById(jobId);
    if (!job) {
      if (req.file) {
        fs.unlinkSync(req.file.path); // deletes the file if job is not found
      }
      return res.status(404).json({ message: "Job not found" });
    }

    //check if file was provided
    if (!req.file) {
      return res.status(400).json({ message: "File not uploaded" });
    }

    const file = new File({
      jobId: jobId,
      filename: req.file.filename,
      originalName: req.file.originalname,
      fileSize: req.file.size,
      uploadedBy: req.user._id,
      contentType: req.file.mimetype,
      storagePath: req.file.path,
    });

    await file.save();

    res.status(201).json({
      message: "File uploaded successully",
      file: {
        id: file._id,
        filename: file.filename,
        originalName: file.originalName,
        fileSize: file.fileSize,
        uploadedAt: file.createdAt,
      },
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    if (req.file) {
      fs.unlinkSync(req.file.path); // deletes the file if there was an error
    }
    res.status(500).json({ message: "Internal server error" });
  }
});

// get all files for a specific job
router.get("/job/:jobId", async (req, res) => {
  try {
    console.log("Searching for files");
    const { jobId } = req.params;

    //check if job exists
    const job = await ServiceRequest.findById(jobId);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const files = await File.find({ jobId: jobId })
      .sort({ createdAt: -1 })
      .select("-storagePath"); //sorts files by createdAt in descending order and excludes storagePath from the response

    res.status(200).json(files);
  } catch (error) {
    console.error("Error fetching files:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// download file endpoint
router.get("/download/:fileId", async (req, res) => {
  try {
    const { fileId } = req.params;

    //check if file exists
    const file = await File.findById(fileId);
    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    const job = await ServiceRequest.findById(file.jobId);

    if (!job) {
      return res.status(404).json({ message: "Corresponding Job Not Found" });
    }

    if (!fs.existsSync(file.storagePath)) {
      return res.status(404).json({ message: "File not found on server" });
    }

    //set headers
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${file.originalName}"`
    );
    res.setHeader("Content-Type", file.contentType);

    // streams file to response
    const fileStream = fs.createReadStream(file.storagePath);
    fileStream.pipe(res);
  } catch (error) {
    console.error("Error downloading file:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// delete file endpoint
router.delete("/delete/:fileId", async (req, res) => {
  try {
    const { fileId } = req.params;

    const file = await File.findById(fileId);

    if (!file) {
      return res.status(404).json({ message: "File Not Found" });
    }

    const job = await ServiceRequest.findById(file.jobId);

    if (!job) {
      return res
        .status(404)
        .json({ message: "Corresponding Service Request Not Found" });
    }

    // only freelancer can delete a file
    /*if (file.uploadedBy.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this file" });
    }*/

    // delte file from disk
    if (fs.existsSync(file.storagePath)) {
      fs.unlinkSync(file.storagePath);
    }

    //delete file from db
    await File.findByIdAndDelete(fileId);
    res.status(200).json({ message: "File deleted successfully" });
  } catch (error) {
    console.error("Error deleting file", error);
    res
      .status(500)
      .json({ message: "Error deleting file", error: error.message });
  }
});

module.exports = router;
