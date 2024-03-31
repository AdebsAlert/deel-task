const Sequelize = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite3",
});

class Profile extends Sequelize.Model {}
Profile.init(
  {
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    profession: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    balance: {
      type: Sequelize.DECIMAL(12, 2),
      defaultValue: 0, // set a default value for balance
    },
    type: {
      type: Sequelize.ENUM("client", "contractor"),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Profile",
  }
);

class Contract extends Sequelize.Model {}
Contract.init(
  {
    terms: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    status: {
      type: Sequelize.ENUM("new", "in_progress", "terminated"),
      defaultValue: "new", // set default value for status as new
    },
  },
  {
    sequelize,
    modelName: "Contract",
  }
);

class Job extends Sequelize.Model {}
Job.init(
  {
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    price: {
      type: Sequelize.DECIMAL(12, 2),
      allowNull: false,
    },
    paid: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    paymentDate: {
      type: Sequelize.DATE,
    },
  },
  {
    sequelize,
    modelName: "Job",
  }
);

// adjusted associations naming and foreign keys for consistency
Profile.hasMany(Contract, { foreignKey: "clientId", as: "clientContracts" });
Contract.belongsTo(Profile, { foreignKey: "clientId", as: "client" });

Profile.hasMany(Contract, {
  foreignKey: "contractorId",
  as: "contractorContracts",
});
Contract.belongsTo(Profile, { foreignKey: "contractorId", as: "contractor" });

Contract.hasMany(Job);
Job.belongsTo(Contract);

module.exports = {
  sequelize,
  Profile,
  Contract,
  Job,
};
