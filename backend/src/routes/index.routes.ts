import { Router, Request, Response } from "express";
import ApiV1Routes from "./api.v1.routes";

const IndexRoutes = Router();

IndexRoutes.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Welcome Message",
  });
});

// api v1 routes
IndexRoutes.use("/api/v1/", ApiV1Routes);

// if no routes find-out
IndexRoutes.use("", (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    statusCode: 404,
    url: req.baseUrl,
    type: req.method,
    message: "API not found",
  });
});

export default IndexRoutes;
