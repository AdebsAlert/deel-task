const mockUser = {
  id: 1,
  firstName: "Adebayo",
  lastName: "Mustafa",
  profession: "SWE",
  balance: 2000,
  type: "client",
  createdAt: "2024-03-31T14:19:54.227Z",
  updatedAt: "2024-03-31T19:05:31.503Z",
};

const mockContract = {
  id: 1,
  terms: "loren ipsum blah blah blah",
  status: "terminated",
  createdAt: "2024-03-31T14:19:54.227Z",
  updatedAt: "2024-03-31T14:19:54.227Z",
  ContractorId: 5,
  ClientId: 1,
};

const mockJob = {
  id: 11,
  description: "backend work",
  price: 21,
  paid: true,
  paymentDate: "2020-08-10T19:11:26.737Z",
  createdAt: "2024-03-31T14:19:54.227Z",
  updatedAt: "2024-03-31T14:19:54.227Z",
  ContractId: 1,
};

const mockContractWithJobs = {
  id: 1,
  terms: "loren ipsum blah blah blah",
  status: "terminated",
  createdAt: "2024-03-31T14:19:54.227Z",
  updatedAt: "2024-03-31T14:19:54.227Z",
  ContractorId: 5,
  ClientId: 1,
  Jobs: [
    {
      id: 11,
      description: "backend work",
      price: 21,
      paid: false,
      paymentDate: null,
      createdAt: "2024-03-31T14:19:54.227Z",
      updatedAt: "2024-03-31T14:19:54.227Z",
      ContractId: 1,
    },
    {
      id: 12,
      description: "frontend work",
      price: 222,
      paid: false,
      paymentDate: null,
      createdAt: "2024-03-31T14:19:54.227Z",
      updatedAt: "2024-03-31T14:19:54.227Z",
      ContractId: 1,
    },
  ],
};
const mockContractWithJobsAndContractor = {
  id: 1,
  terms: "loren ipsum blah blah blah",
  status: "terminated",
  createdAt: "2024-03-31T14:19:54.227Z",
  updatedAt: "2024-03-31T14:19:54.227Z",
  Contractor: {
    id: 1,
    firstName: "Adebayo",
    lastName: "Mustafa",
    profession: "SWE",
    balance: 2000,
    type: "client",
    createdAt: "2024-03-31T14:19:54.227Z",
    updatedAt: "2024-03-31T14:19:54.227Z",
  },
  ClientId: 1,
  Jobs: [
    {
      id: 11,
      description: "devops work",
      price: 21,
      paid: false,
      paymentDate: null,
      createdAt: "2024-03-31T14:19:54.227Z",
      updatedAt: "2024-03-31T14:19:54.227Z",
      ContractId: 1,
    },
    {
      id: 12,
      description: "backend test",
      price: 222,
      paid: false,
      paymentDate: null,
      createdAt: "2024-03-31T14:19:54.227Z",
      updatedAt: "2024-03-31T14:19:54.227Z",
      ContractId: 1,
    },
  ],
};

module.exports = {
  mockContract,
  mockUser,
  mockJob,
  mockContractWithJobs,
  mockContractWithJobsAndContractor,
};
