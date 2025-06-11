import fs from "fs";
import path from "path";
import morgan from "morgan";

const morganFormat = {
  COMBINE: "combined",
  TINY: "tiny",
  DEV: "dev",
  SHORT: "short",
  COMMON: "common",
};

const morganConfigFunction = () => {
  const morganFilePath = fs.createWriteStream(
    path.join(__dirname, "../../", "app-http.log"),
    {
      flags: "a",
    }
  );

  const morganConfig = morgan(morganFormat.COMBINE, { stream: morganFilePath });
  return morganConfig;
};

export default morganConfigFunction;
