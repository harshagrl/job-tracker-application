const express = require("express");
const {
  getJobs,
  createJob,
  updateJobStatus,
  deleteJob,
} = require("../controllers/jobController");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.route("/").get(protect, getJobs).post(protect, createJob);

router.route("/:id").patch(protect, updateJobStatus).delete(protect, deleteJob);

module.exports = router;
