const multer = require('multer');
const Job = require('../models/Job');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../utils/asyncHandler');

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new ErrorResponse('Only PDF, DOC, and DOCX files are allowed!', 400), false);
    }
  }
});

exports.uploadResume = asyncHandler(async (req, res, next) => {
  const job = await Job.findById(req.params.jobId);

  if (!job) {
    return next(new ErrorResponse(`Job not found with id of ${req.params.jobId}`, 404));
  }

  if (job.user.toString() !== req.user.id) {
    return next(new ErrorResponse(`Not authorized to update this job`, 401));
  }

  if (!req.file) {
    return next(new ErrorResponse('Please upload a file', 400));
  }

  job.resume = {
    data: req.file.buffer,
    contentType: req.file.mimetype,
    filename: req.file.originalname
  };

  await job.save();

  res.status(200).json({
    success: true,
    message: 'Resume uploaded successfully',
    data: {
      filename: job.resume.filename,
      contentType: job.resume.contentType
    }
  });
});

exports.uploadSingleResume = upload.single('resume');

exports.downloadResume = asyncHandler(async (req, res, next) => {
  const job = await Job.findById(req.params.jobId);

  if (!job) {
    return next(new ErrorResponse(`Job not found with id of ${req.params.jobId}`, 404));
  }

  if (job.user.toString() !== req.user.id) {
    return next(new ErrorResponse(`Not authorized to access this resume`, 401));
  }

  if (!job.resume || !job.resume.data) {
    return next(new ErrorResponse('Resume not found for this job', 404));
  }

  res.set({
    'Content-Type': job.resume.contentType,
    'Content-Disposition': `attachment; filename="${job.resume.filename}"`
  });
  res.send(job.resume.data);
});