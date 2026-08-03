import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import routes from "./routes";
import { requestId } from "./middleware/request-id";
import { errorHandler } from "./middleware/error-handler";
import { notFound } from "./middleware/not-found";
import { ApiResponse } from "./utils/api-response";

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

app.use("/api/v1", routes);

app.use(notFound);

app.use(errorHandler);

export default app;