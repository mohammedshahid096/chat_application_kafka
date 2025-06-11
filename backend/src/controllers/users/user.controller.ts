import { Request, Response, NextFunction } from "express";
import httpErrors from "http-errors";
import errorHandling, { AppError } from "../../utils/errorHandling";
import prisma from "../../config/db.config";
import logger from "../../config/logger.config";
import { RegisterUserBodyType } from "../../types/dto/user.dto";
import bcrypt from "bcrypt";

export const registerUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    logger.info(
      "controllers - users - user.controller - registerController - Start"
    );
    const body: RegisterUserBodyType = req.body;
    const isUserExist = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (isUserExist) {
      return next(httpErrors.BadRequest("user already exist"));
    }
    body.password = await bcrypt.hash(body.password, 10);
    const newUserDetails = await prisma.user.create({
      data: body,
    });

    logger.info(
      "controllers - users - user.controller - registerController - End"
    );

    res.status(200).json({
      success: true,
      statusCode: 201,
      message: "successfully new user is created",
      data: newUserDetails,
    });
  } catch (error) {
    logger.error(
      "controllers - users - user.controller - registerController - Error",
      error
    );
    errorHandling.handlingControllerError(error as AppError, next);
  }
};
