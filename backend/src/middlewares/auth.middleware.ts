import { Request, Response, NextFunction } from "express";
import httpErrors from "http-errors";
import errorHandling from "../utils/errorHandling";
import logger from "../config/logger.config";
import { verifyAccessToken } from "../utils/jwt.token";
import prisma from "../config/db.config";
import { UserSchemaType } from "../types/schemas/users/user";

interface AuthenticatedRequest extends Request {
  authUser?: UserSchemaType;
}

export const Authentication = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    logger.info("middlewares - auth.middleware - Authentication - start");
    let authHeader = req.header("Authorization");

    // Validate token format
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(httpErrors.Unauthorized("Authentication token required"));
    }

    // Extract and verify token
    const token = authHeader.split(" ")[1];
    const decode = await verifyAccessToken(token);

    if (!decode.success || !decode.id) {
      const errorMessage = decode.error?.message || "Invalid token";
      return next(httpErrors.Unauthorized(errorMessage));
    }

    let userExist = await prisma.user.findUnique({
      where: {
        id: decode?.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        profileUrl: true,
        created_at: true,
      },
    });

    if (!userExist) return next(httpErrors.NotFound("user not found"));

    req.authUser = userExist;
    logger.info(`name : ${userExist.name} email: ${userExist.email}`);
    logger.info("middlewares - auth.middleware - Authentication - End");
    next();
  } catch (error: any) {
    logger.error("middlewares - auth.middleware - Authentication - End", error);
    errorHandling.handlingControllerError(error, next);
  }
};
