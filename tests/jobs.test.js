const {
  contractsRepository,
} = require("../src/repositories/contracts/contracts.repository");
const {
  transactionsRepository,
} = require("../src/repositories/transactions/transactions.repository");
const {
  usersRepository,
} = require("../src/repositories/users/users.repository");
const {
  mockContractWithJobs,
  mockUser,
  mockContractWithJobsAndContractor,
} = require("../src/utils/mocks/models.mock");
const { jobService } = require("../src/services/jobs/jobs.service");

jest.mock("../src/repositories/contracts/contracts.repository");
jest.mock("../src/repositories/transactions/transactions.repository");
jest.mock("../src/repositories/users/users.repository");

describe("Jobs use Case", () => {
  describe("getUnpaidJobsForUser", () => {
    test("should fetch unpaid jobs for user from the database and map correctly", async () => {
      contractsRepository.getAllNonTerminatedContractsWithUnpaidJobsThatCurrentUserIsInvolvedWith.mockResolvedValue(
        [mockContractWithJobs]
      );

      const response = await jobService.getUnpaidJobsForUser(1);

      expect(
        contractsRepository.getAllNonTerminatedContractsWithUnpaidJobsThatCurrentUserIsInvolvedWith
      ).toHaveBeenCalledWith(1);
      expect(response[0]).toEqual(mockContractWithJobs.Jobs[0]);
    });
  });

  describe("pay", () => {
    describe("when paying for an unpaid job and user has enough balance", () => {
      test("should update db with payment information", async () => {
        usersRepository.getUserById.mockResolvedValue(mockUser);
        contractsRepository.getContractWithContractorByJobId.mockResolvedValue(
          mockContractWithJobsAndContractor
        );
        transactionsRepository.paymentTransaction.mockResolvedValue(true);

        const response = await jobService.pay(11, 2);

        expect(response).toBeTruthy();
      });
    });
  });
});
