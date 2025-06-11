import express, { Application, Request, Response, NextFunction } from "express";
import ratelimitConfig from "./src/config/ratelimit.config";
import helmetConfig from "./src/config/helmet.config";
import config from "./src/config/index.config";
import morganConfigFunction from "./src/config/morgan.config";
import compressionConfig from "./src/config/compression.config";
import corsConfig from "./src/config/cors.config";
import IndexRoutes from "./src/routes/index.routes";
import errorHandling from "./src/utils/errorHandling";

const app: Application = express();

app.use(helmetConfig);

if (config.DEVELOPMENT_MODE === "development") {
  app.use(morganConfigFunction());
}
app.use(ratelimitConfig);
app.use(compressionConfig);
app.use(corsConfig);
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: false }));

// routes
app.use(IndexRoutes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  errorHandling.handlingAppError(err, res);
});

export default app;
