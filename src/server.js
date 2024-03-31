require("dotenv").config();
const app = require("./app");
const logger = require("./utils/logger");

// use env variables to set the port or default to 3001
const PORT = process.env.PORT || 3001;

init();

async function init() {
  try {
    app
      .listen(PORT, () => {
        logger.info(`Express App Listening on Port ${PORT}`);
      })
      .on("error", (error) => {
        logger.error(`Server failed to start: ${JSON.stringify(error)}`);
        process.exit(1);
      });
  } catch (error) {
    logger.error(`An error occurred: ${JSON.stringify(error)}`);
    process.exit(1);
  }
}
