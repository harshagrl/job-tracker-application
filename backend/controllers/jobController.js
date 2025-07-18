const Job = require("../models/Job");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../utils/asyncHandler");

exports.getJobs = asyncHandler(async (req, res, next) => {
  const { status } = req.query;
  const filter = { user: req.user.id };

  if (status) {
    filter.status = status;
  }

  const jobs = await Job.find(filter).sort("-createdAt");
  res.status(200).json({ success: true, count: jobs.length, data: jobs });
});

exports.createJob = asyncHandler(async (req, res, next) => {
  const job = await Job.create({ ...req.body, user: req.user.id });
  job.timeline.push({ status: "applied" });
  await job.save();
  res.status(201).json({ success: true, data: job });
});

exports.updateJobStatus = asyncHandler(async (req, res, next) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    return next(
      new ErrorResponse(`Job not found with id of ${req.params.id}`, 404)
    );
  }

  if (job.user.toString() !== req.user.id) {
    return next(new ErrorResponse(`Not authorized to update this job`, 401));
  }

  job.status = req.body.status;
  job.timeline.push({ status: req.body.status });
  await job.save();

  res.status(200).json({ success: true, data: job });
});

exports.deleteJob = asyncHandler(async (req, res, next) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    return next(
      new ErrorResponse(`Job not found with id of ${req.params.id}`, 404)
    );
  }

  if (job.user.toString() !== req.user.id) {
    return next(new ErrorResponse(`Not authorized to delete this job`, 401));
  }

  await job.deleteOne();

  res.status(200).json({ success: true, data: {} });
});
