const express = require("express");
const bodyParser = require("body-parser");
const { sequelize } = require("./model");
const logger = require("./utils/logger");

const app = express();

app.use(bodyParser.json());

// set the sequelize instance and models on the request object
app.use((req, res, next) => {
  req.sequelize = sequelize;
  req.models = sequelize.models;
  next();
});

// route handlers
const contractRoutes = require("./controllers/contracts.controller");
const jobRoutes = require("./controllers/jobs.controller");
const balancesRoutes = require("./controllers/balances.controller");
const adminRoutes = require("./controllers/admin.controller");

app.use("/api/contracts", contractRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/balances", balancesRoutes);
app.use("/api/admin", adminRoutes);

// error handling middleware to catch errors during request handling
app.use((err, req, res, next) => {
  logger.error(`An error occurred: ${err.message}`);
  res.status(500).json({ error: "Internal Server Error" });
});

module.exports = app;
