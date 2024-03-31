const logger = require("../../utils/logger");
const { Job, Profile, sequelize } = require("../../model");
const { Op } = require("sequelize");

async function paymentTransaction(payingUser, job, contractor) {
  try {
    await sequelize.transaction(async (t) => {
      // deduct the job price from the paying user's balance
      await Profile.update(
        { balance: sequelize.literal(`balance - ${job.price}`) },
        { where: { id: payingUser.id }, transaction: t }
      );

      // add the job price to the contractor's balance
      await Profile.update(
        { balance: sequelize.literal(`balance + ${job.price}`) },
        { where: { id: contractor.id }, transaction: t }
      );

      // set the job as paid
      await Job.update(
        { paid: true },
        { where: { id: job.id }, transaction: t }
      );
    });

    return true;
  } catch (error) {
    logger.error("Error executing payment transaction:", error);
    throw error;
  }
}

const transactionsRepository = {
  paymentTransaction,
};

module.exports = {
  transactionsRepository,
};
