const {
  contractsRepository,
} = require("../../repositories/contracts/contracts.repository");

async function getContractById(id) {
  try {
    if (!id || typeof id !== "number") {
      throw new Error("Invalid contract ID");
    }

    const contract = await contractsRepository.getContractById(id);
    if (!contract) {
      throw new Error("Contract not found");
    }

    return contract;
  } catch (error) {
    throw new Error(`Error fetching contract by ID: ${error.message}`);
  }
}

async function getAll() {
  try {
    return await contractsRepository.getAllContracts();
  } catch (error) {
    throw new Error(`Error fetching all contracts: ${error.message}`);
  }
}

async function getContractCurrentUser(userId) {
  try {
    if (!userId || typeof userId !== "number") {
      throw new Error("Invalid user ID");
    }

    return await contractsRepository.getAllContractsForCurrentUser(userId);
  } catch (error) {
    throw new Error(
      `Error fetching contracts for current user: ${error.message}`
    );
  }
}

const contractService = {
  getAll,
  getContractById,
  getContractCurrentUser,
};

module.exports = {
  contractService,
};
