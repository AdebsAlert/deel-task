const express = require("express");
const { getProfile } = require("../middleware/getProfile");
const { depositsService } = require("../services/deposits/deposits.service");
const logger = require("../utils/logger");
const router = express.Router();

router.post("/deposit/:userId", getProfile, async (req, res) => {
  const profileId = req.profile.id;
  const amount = parseFloat(req.body.amount);

  const { userId } = req.params;

  logger.info(
    `Deposit request received from user ${profileId} for userId ${userId} with amount ${amount}`
  );

  if (userId !== profileId) {
    logger.warn(
      `User ${profileId} is not authorized to perform the deposit for userId ${userId}`
    );
    return res.status(403).end();
  }

  if (isNaN(amount) || amount <= 0) {
    logger.error(
      `Invalid amount ${req.body.amount} provided by user ${profileId}`
    );
    return res.status(400).json({ error: "Invalid amount" }).end();
  }

  const depositResult = await depositsService.depositForUser(userId, amount);

  if (depositResult === "Amount over max allowed") {
    logger.error(
      `Deposit failed for user ${profileId} due to amount over max allowed`
    );
    return res.status(400).json({ error: "Amount over max allowed" }).end();
  } else if (typeof depositResult === "object") {
    logger.info(
      `Deposit successful for user ${profileId} with userId ${userId}. New balance: ${depositResult.balance}`
    );
    return res.json(depositResult);
  } else {
    logger.error(
      `Unexpected error occurred during deposit for user ${profileId} with userId ${userId}`
    );
    return res.status(500).json({ error: "Internal Server Error" }).end();
  }
});

module.exports = router;
