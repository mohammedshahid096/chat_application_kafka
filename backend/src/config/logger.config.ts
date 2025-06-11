import { createLogger, format, transports } from "winston";
import config from "./index.config";

const { combine, timestamp, json, splat } = format;

interface LoggerOptions {
  level: string;
  format: any; // Can be more specific with winston.Logform.Format
  transports: any[]; // Can be more specific with winston.transport[]
}

const DevelopmentLogger = (): any => {
  return createLogger({
    level: "debug",
    format: combine(timestamp(), json(), splat()),
    transports: [
      new transports.Console(),
      new transports.File({ filename: "app-combined.log" }),
      new transports.File({ filename: "app-error.log", level: "error" }),
      new transports.File({ filename: "app-info.log", level: "info" }),
      new transports.File({ filename: "app-debug.log", level: "debug" }),
    ],
  });
};

const ProductionLogger = (): any => {
  return createLogger({
    level: "info",
    format: combine(timestamp(), json(), splat()),
    transports: [
      new transports.Console({ level: "error" }),
      // new transports.File({ filename: "app-combined.log" }),
      // new transports.File({ filename: "app-error.log", level: "error" }),
      // new transports.File({ filename: "app-info.log", level: "info" }),
    ],
  });
};

const logger =
  config.DEVELOPMENT_MODE === "development"
    ? DevelopmentLogger()
    : ProductionLogger();

export default logger;
