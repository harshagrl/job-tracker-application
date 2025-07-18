const express = require('express');
const {
  uploadResume,
  uploadSingleResume,
  downloadResume
} = require('../controllers/uploadController');
const {
  protect
} = require('../middleware/auth');

const router = express.Router();

router.route('/:jobId/resume')
  .post(protect, uploadSingleResume, uploadResume)
  .get(protect, downloadResume);

module.exports = router;