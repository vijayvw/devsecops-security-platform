import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import { requestId } from "./middleware/request-id.js";
import { errorHandler } from "./middleware/error-handler.js";
import { notFound } from "./middleware/not-found.js";
import { ApiResponse } from "./utils/api-response.js";

const app = express();

app.disable("x-powered-by");

app.use(requestId);

app.use(helmet());
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

app.get("/", (_req, res) => {
  res.json(
    ApiResponse.success("DevSecOps Security Platform API", {
      version: "1.0.0",
    }),
  );
});

/*
 * 404
 */
app.use(notFound);

/*
 * Global Error Handler
 */
app.use(errorHandler);

export default app;