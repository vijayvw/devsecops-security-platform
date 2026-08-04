import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import routes from "./routes";
import { requestId } from "./middleware/request-id";
import { errorHandler } from "./middleware/error-handler";
import { notFound } from "./middleware/not-found";
import { ApiResponse } from "./utils/api-response";
import { securityScanRoutes } from "./modules/security-scans";
import { securityRunnerRoutes } from "./modules/security-runner";
import { findingsRoutes } from "./modules/findings";
import { githubWebhookRoutes } from "./modules/github-webhooks";
import { webhookRoutes } from "./modules/webhooks";


const app = express();

app.disable("x-powered-by");

app.use(requestId);

app.use(helmet());
app.use(cors());

app.use(
  express.json({
    verify(req: any, _res, buffer) {
      req.rawBody = buffer.toString("utf8");
    },
  }),
);
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

app.get("/", (_req, res) => {
  res.json(
    ApiResponse.success("DevSecOps Security Platform API", {
      version: "1.0.0",
    }),
  );
});

app.use("/api/v1", routes);

app.use("/api/v1/security-scans", securityScanRoutes);
app.use(
  "/api/v1/security-runner",
  securityRunnerRoutes,
);
app.use(
  "/api/v1/github",
  githubWebhookRoutes,
);
app.use("/api/v1/findings", findingsRoutes);
app.use("/api/v1/webhooks", webhookRoutes);
app.use(notFound);

app.use(errorHandler);


export default app;