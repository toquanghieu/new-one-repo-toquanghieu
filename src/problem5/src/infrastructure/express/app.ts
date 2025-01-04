import "reflect-metadata";
import { urlencoded } from "body-parser";
import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import { RegisterRoutes } from "./routes";
import dataSource from "../typeorm/connection";
import { errorHandler, startHandler } from "./handler";

if (process.env.NODE_ENV !== "e2e") {
  dataSource.initialize().catch((err) => {
    console.error(err);
  });
}

const app = express();

app.set("trust proxy", 1);

app.use(helmet.dnsPrefetchControl());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());

app.use(cors());

app.use(urlencoded({ extended: true, limit: "1gb" }));

app.use(express.json({ limit: "1gb" }));

app.use(
  rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 10000,
    headers: false,
  })
);

app.use(startHandler);

RegisterRoutes(app);

app.use(errorHandler);

// health check
app.get("/", (_, res) => {
  res.json({ message: "Healthy" });
});

export default app;
