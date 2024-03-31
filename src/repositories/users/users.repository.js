const logger = require("../../utils/logger");
const { Profile, Contract, Job } = require("../../model");
const { Op } = require("sequelize");

async function getUserById(id) {
  try {
    return await Profile.findOne({ where: { id } });
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error;
  }
}

async function getUserWithContractsAndNotPaidJobs(userId) {
  try {
    return await Profile.findOne({
      where: { id: userId },
      include: [
        {
          model: Contract,
          as: "Client",
          where: {
            status: { [Op.not]: "terminated" },
          },
          include: [
            {
              model: Job,
              where: { paid: { [Op.not]: true } },
            },
          ],
        },
      ],
    });
  } catch (error) {
    logger.error("Error fetching user with contracts and unpaid jobs:", error);
    throw error;
  }
}

const usersRepository = {
  getUserById,
  getUserWithContractsAndNotPaidJobs,
};

module.exports = {
  usersRepository,
};
