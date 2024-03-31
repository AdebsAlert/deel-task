const express = require("express");
const { getProfile } = require("../middleware/getProfile");
const { contractService } = require("../services/contracts/contracts.service");
const logger = require("../utils/logger");
const router = express.Router();

router.get("/all", getProfile, async (req, res) => {
  try {
    const contracts = await contractService.getAll();
    if (!contracts) {
      logger.warn("No contracts found");
      return res.status(404).end();
    }
    res.json(contracts);
  } catch (error) {
    logger.error("Error fetching all contracts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:id", getProfile, async (req, res) => {
  try {
    const profileId = req.profile.id;
    const { id } = req.params;

    const contract = await contractService.getContractById(id);
    if (!contract) {
      logger.warn(`Contract with id ${id} not found`);
      return res.status(404).end();
    }

    if (
      contract.clientId !== profileId &&
      contract.contractorId !== profileId
    ) {
      logger.warn(
        `User ${profileId} is not authorized to access contract with id ${id}`
      );
      return res.status(403).end();
    }

    res.json(contract);
  } catch (error) {
    logger.error("Error fetching contract by id:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("", getProfile, async (req, res) => {
  try {
    const userId = req.profile.id;

    const contracts = await contractService.getContractCurrentUser(userId);
    if (!contracts) {
      logger.warn(`No contracts found for user with id ${userId}`);
      return res.status(404).end();
    }

    res.json(contracts);
  } catch (error) {
    logger.error("Error fetching contracts for current user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
