import config from "./index.config";
import cors from "cors";

const corsOptions = {
  origin: config.CORS_ALLOW_ORIGINS,
  credentials: true,
};

const corsConfig = cors(corsOptions);

export default corsConfig;
