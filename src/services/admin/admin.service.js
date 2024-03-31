const {
  contractsRepository,
} = require("../../repositories/contracts/contracts.repository");

async function professionMadeMoreMoneyForTime(start, end) {
  const contracts =
    await contractsRepository.getContractsWithContractorAndJobsBetweenDate(
      start,
      end
    );
  const professionEarnings = calculateProfessionEarnings(contracts);
  const sortedProfessions = orderByEarnings(professionEarnings);
  return sortedProfessions[0];
}

async function bestCustomers(start, end, limit = 2) {
  const contracts =
    await contractsRepository.getContractsWithClientAndJobsBetweenDate(
      start,
      end
    );
  const customerEarnings = calculateCustomerEarnings(contracts);
  const sortedCustomers = customerEarnings.sort(
    (a, b) => b.totalPaid - a.totalPaid
  );
  return sortedCustomers.slice(0, limit);
}

function calculateProfessionEarnings(contracts) {
  const professionEarnings = {};

  contracts.forEach((contract) => {
    const profession = contract.Contractor.profession;
    const earnings = contract.Jobs.reduce((total, job) => total + job.price, 0);

    if (!professionEarnings[profession]) {
      professionEarnings[profession] = 0;
    }

    professionEarnings[profession] += earnings;
  });

  return professionEarnings;
}

function orderByEarnings(professionEarnings) {
  return Object.entries(professionEarnings)
    .sort((a, b) => b[1] - a[1]) // Sorting professions by earnings in descending order
    .map(([profession, earnings]) => ({ profession, earnings }));
}

function calculateCustomerEarnings(contracts) {
  const customerEarningsMap = new Map();

  contracts.forEach((contract) => {
    const client = contract.Client;
    const totalPrice = contract.Jobs.reduce(
      (total, job) => total + job.price,
      0
    );

    if (!customerEarningsMap.has(client.id)) {
      customerEarningsMap.set(client.id, {
        id: client.id,
        fullName: `${client.firstName} ${client.lastName}`,
        totalPaid: 0,
      });
    }

    const customerEarnings = customerEarningsMap.get(client.id);
    customerEarnings.totalPaid += totalPrice;
  });

  return Array.from(customerEarningsMap.values());
}

const adminService = {
  professionMadeMoreMoneyForTime,
  bestCustomers,
};

module.exports = {
  adminService,
};
