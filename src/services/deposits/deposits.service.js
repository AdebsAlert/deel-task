const {
  usersRepository,
} = require("../../repositories/users/users.repository");

async function depositForUser(userId, amount) {
  try {
    if (!userId || isNaN(userId) || !amount || isNaN(amount)) {
      throw new Error("Invalid user ID or amount");
    }

    const profile = await usersRepository.getUserWithContractsAndNotPaidJobs(
      userId
    );

    if (!profile) {
      throw new Error("User profile not found");
    }

    const jobs = profile.Client.flatMap((contract) => contract.Jobs);
    const totalToPay = getTotalToPay(jobs);

    let maxDeposit = Number.MAX_SAFE_INTEGER;

    if (totalToPay > 0) {
      maxDeposit = totalToPay * 0.25;
    }

    if (maxDeposit > amount) {
      await profile.increment({ balance: amount });
      return { profile };
    } else {
      throw new Error("Amount over max allowed");
    }
  } catch (error) {
    throw new Error(`Error depositing amount for user: ${error.message}`);
  }
}

const depositsService = {
  depositForUser,
};

module.exports = {
  depositsService,
};

function getTotalToPay(jobs) {
  return jobs.reduce((prev, curr) => {
    return prev + curr.price;
  }, 0);
}
