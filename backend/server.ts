import app from "./app";
import config from "./src/config/index.config";
import logger from "./src/config/logger.config";

function startServer() {
  app.listen(config.PORT, () => {
    console.log("Server Mode : ", config.DEVELOPMENT_MODE);
    console.log("server is started", config.PORT);
    logger.info(`Server Mode : ${config.DEVELOPMENT_MODE}`);
    logger.info(`Server is running on  : http://localhost:${config.PORT}`);
    console.log(`Server is running on  : http://localhost:${config.PORT}`);
  });
}

startServer();
