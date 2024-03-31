const express = require("express");
const { adminService } = require("../services/admin/admin.service");
const router = express.Router();
const { DateTime } = require("luxon");
const logger = require("../utils/logger");

router.get("/best-profession", async (req, res) => {
  try {
    const { start, end } = req.query;

    // validate that the start and end date is set
    if (!start || !end) {
      const errorMessage = "start and end dates are required";
      logger.error(errorMessage);
      return res.status(400).json({ error: errorMessage });
    }

    const startDate = DateTime.fromFormat(start, "dd-MM-yyyy");
    const endDate = DateTime.fromFormat(end, "dd-MM-yyyy");

    const user = await adminService.professionMadeMoreMoneyForTime(
      startDate.toJSDate(),
      endDate.toJSDate()
    );

    logger.info(
      `Best profession for time period ${start} to ${end}: ${user.profession}`
    );
    res.json(user);
  } catch (error) {
    logger.error(`An error occurred: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/best-clients", async (req, res) => {
  try {
    const { start, end, limit } = req.query;

    if (!start || !end || !limit) {
      const errorMessage = "start, end, and limit are required";
      logger.error(errorMessage);
      return res.status(400).json({ error: errorMessage });
    }

    const startDate = DateTime.fromFormat(start, "dd-MM-yyyy");
    const endDate = DateTime.fromFormat(end, "dd-MM-yyyy");

    const user = await adminService.bestCustomers(
      startDate.toJSDate(),
      endDate.toJSDate(),
      limit
    );

    logger.info(
      `Best clients for time period ${start} to ${end} with limit ${limit}: ${user.length}`
    );
    res.json(user);
  } catch (error) {
    logger.error(`An error occurred: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
