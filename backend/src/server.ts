import "dotenv/config";

import app from "./app.js";
import { env } from "./config/env.js";
import { logger } from "./config/logger.js";

app.listen(env.PORT, () => {
  logger.info(`🚀 ${env.APP_NAME} started`);
  logger.info(`Environment : ${env.NODE_ENV}`);
  logger.info(`Listening on : http://localhost:${env.PORT}`);
});
