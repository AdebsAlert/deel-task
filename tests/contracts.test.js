const {
  contractService,
} = require("../src/services/contracts/contracts.service");
const {
  contractsRepository,
} = require("../src/repositories/contracts/contracts.repository");
const { mockContract, mockUser } = require("../src/utils/mocks/models.mock");

jest.mock("../src/repositories/contracts/contracts.repository");

describe("Contracts use Case", () => {
  describe("getContractById", () => {
    test("should fetch contract by id from the database", async () => {
      contractsRepository.getContractById.mockResolvedValue(mockContract);

      const result = await contractService.getContractById(1);
      expect(result).toEqual(mockContract);
      expect(contractsRepository.getContractById).toHaveBeenCalledWith(1);
    });
  });

  describe("getAll", () => {
    test("should fetch all contracts from the database", async () => {
      const mockContracts = [mockContract];
      contractsRepository.getAllContracts.mockResolvedValue(mockContracts);

      const result = await contractService.getAll();
      expect(result).toEqual(mockContracts);
      expect(contractsRepository.getAllContracts).toHaveBeenCalled();
    });
  });

  describe("getContractCurrentUser", () => {
    test("should fetch contracts for the current user from the database", async () => {
      contractsRepository.getAllContractsForCurrentUser.mockResolvedValue(
        mockUser
      );

      const result = await contractService.getContractCurrentUser(1);
      expect(result).toEqual(mockUser);
      expect(
        contractsRepository.getAllContractsForCurrentUser
      ).toHaveBeenCalledWith(1);
    });
  });
});
