const express = require("express");
const { getProfile } = require("../middleware/getProfile");
const { jobService } = require("../services/jobs/jobs.service");
const logger = require("../utils/logger");
const router = express.Router();

router.get("/unpaid", getProfile, async (req, res) => {
  try {
    const userId = req.profile.id;

    const jobs = await jobService.getUnpaidJobsForUser(userId);
    if (!jobs) {
      logger.warn(`No unpaid jobs found for user with id ${userId}`);
      return res.status(404).end();
    }

    res.json(jobs);
  } catch (error) {
    logger.error("Error fetching unpaid jobs for user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/:job_id/pay", getProfile, async (req, res) => {
  try {
    const userId = req.profile.id;
    const { job_id } = req.params;

    const result = await jobService.pay(job_id, userId);

    if (result === "Not Found") {
      logger.warn(
        `Could not find unpaid job with id ${job_id} for user with id ${userId}`
      );
      return res
        .status(404)
        .json({ message: "Could not find unpaid job for userId" })
        .end();
    }
    if (result === "Not enough balance") {
      logger.warn(
        `Insufficient balance for user with id ${userId} to pay for job with id ${job_id}`
      );
      return res.status(400).json({ message: "Insufficient balance" }).end();
    }

    res.json(result);
  } catch (error) {
    logger.error("Error paying for job:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
