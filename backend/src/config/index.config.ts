import dotenv from "dotenv";
type Environment = "development" | "production";

interface Config {
  PORT: number | string;
  DEVELOPMENT_MODE: Environment;
  CORS_ALLOW_ORIGINS: string[];
}

dotenv.config();

const config: Config = {
  PORT: process.env.PORT || 8001,
  DEVELOPMENT_MODE:
    (process.env.DEVELOPMENT_MODE as Environment) || "development",
  CORS_ALLOW_ORIGINS: JSON.parse(process.env.CORS_ALLOW_ORIGINS || "[]"),
};

export default config;
