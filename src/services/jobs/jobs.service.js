const {
  contractsRepository,
} = require("../../repositories/contracts/contracts.repository");
const {
  transactionsRepository,
} = require("../../repositories/transactions/transactions.repository");
const {
  usersRepository,
} = require("../../repositories/users/users.repository");
const logger = require("../../utils/logger");

async function getUnpaidJobsForUser(userId) {
  try {
    const contracts =
      await contractsRepository.getAllNonTerminatedContractsWithUnpaidJobsThatCurrentUserIsInvolvedWith(
        userId
      );
    return contracts.flatMap((contract) => contract.Jobs);
  } catch (error) {
    logger.error(`Error fetching unpaid jobs for user: ${error.message}`);
    throw new Error("Failed to fetch unpaid jobs for user");
  }
}

async function pay(jobId, userId) {
  try {
    const payingUser = await usersRepository.getUserById(userId);
    const contract = await contractsRepository.getContractWithContractorByJobId(
      jobId
    );

    if (!payingUser || !contract) {
      throw new Error("User or contract not found");
    }

    const job = contract.Jobs.find((job) => job.id === jobId);
    const contractor = contract.Contractor;

    if (!job) {
      throw new Error("Job not found");
    }

    if (payingUser.balance < job.price || job.paid) {
      throw new Error("Insufficient balance or job already paid");
    }

    await transactionsRepository.paymentTransaction(
      payingUser,
      job,
      contractor
    );
    return true;
  } catch (error) {
    logger.error(`Error processing payment: ${error.message}`);
    throw error;
  }
}

const jobService = {
  getUnpaidJobsForUser,
  pay,
};

module.exports = {
  jobService,
};
