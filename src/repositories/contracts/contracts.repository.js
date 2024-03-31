const { Contract, Profile, Job } = require("../../model");
const { Op } = require("sequelize");
const logger = require("../../utils/logger");

async function getContractById(id) {
  try {
    return await Contract.findOne({ where: { id } });
  } catch (error) {
    logger.error("Error fetching contract by ID:", error);
    throw error;
  }
}

async function getAllContracts() {
  try {
    return await Contract.findAll({ include: { all: true, nested: true } });
  } catch (error) {
    logger.error("Error fetching all contracts:", error);
    throw error;
  }
}

async function getAllContractsForCurrentUser(userId) {
  try {
    return await Contract.findAll({
      where: {
        status: {
          [Op.not]: "terminated",
        },
        [Op.or]: [{ ClientId: userId }, { ContractorId: userId }],
      },
    });
  } catch (error) {
    logger.error("Error fetching contracts for current user:", error);
    throw error;
  }
}

async function getAllNonTerminatedContractsWithUnpaidJobsThatCurrentUserIsInvolvedWith(
  userId
) {
  return await Contract.findAll({
    include: {
      model: Job,
      where: {
        paid: {
          [Op.not]: true,
        },
      },
    },
    where: {
      status: {
        [Op.not]: "terminated",
      },
      [Op.or]: [{ ClientId: userId }, { ContractorId: userId }],
    },
  });
}

async function getContractWithContractorByJobId(jobId) {
  return await Contract.findOne({
    include: [
      {
        model: Job,
        where: { id: jobId },
      },
      {
        model: Profile,
        as: "Contractor",
      },
    ],
  });
}

async function getContractsWithContractorAndJobsBetweenDate(start, end) {
  return await Contract.findAll({
    include: [
      {
        model: Profile,
        as: "Contractor",
      },
      {
        model: Job,
        where: {
          paid: true,
          paymentDate: {
            [Op.between]: [start, end],
          },
        },
      },
    ],
  });
}
async function getContractsWithClientAndJobsBetweenDate(start, end) {
  return await Contract.findAll({
    include: [
      {
        model: Profile,
        as: "Client",
      },

      {
        model: Job,
        where: {
          paid: true,
          paymentDate: {
            [Op.between]: [start, end],
          },
        },
      },
    ],
  });
}

const contractsRepository = {
  getContractById,
  getAllContracts,
  getAllContractsForCurrentUser,
  getAllNonTerminatedContractsWithUnpaidJobsThatCurrentUserIsInvolvedWith,
  getContractWithContractorByJobId,
  getContractsWithContractorAndJobsBetweenDate,
  getContractsWithClientAndJobsBetweenDate,
};

module.exports = {
  contractsRepository,
};
