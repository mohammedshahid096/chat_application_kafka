import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import httpErrors from "http-errors";
import errorHandling, { AppError } from "../../utils/errorHandling";
import prisma from "../../config/db.config";
import logger from "../../config/logger.config";
import {
  RegisterUserBodyType,
  LoginUserBodyType,
} from "../../types/dto/user.dto";
import { verifyPasswordMethod } from "../../utils/verify.password";
import { createAccessToken } from "../../utils/jwt.token";
import { UserSchemaType } from "../../types/schemas/users/user";
import _ from "lodash";
interface AuthenticatedRequest extends Request {
  authUser?: UserSchemaType;
}
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

export const loginUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info(
    "controllers - users - user.controller - loginUserController - Start"
  );
  const body: LoginUserBodyType = req.body;
  const isUserExist = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (!isUserExist)
    return next(httpErrors.BadRequest("user email or password not match"));

  let isPasswordMatch = await verifyPasswordMethod(
    body.password,
    isUserExist.password
  );
  if (!isPasswordMatch)
    return next(httpErrors.BadRequest("user email or password not match"));

  let updatedDetails: UserSchemaType = _.cloneDeep(isUserExist);
  delete updatedDetails.password;

  let access_token = await createAccessToken(updatedDetails.id);

  const data = {
    access_token,
    details: updatedDetails,
  };

  logger.info(
    "controllers - users - user.controller - loginUserController - End"
  );
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "user successfully login",
    data,
  });
};

export const getUserProfileDetailsController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    logger.info(
      "controllers - users - user.controller - getUserProfileDetailsController - Start"
    );
    const userId = req?.authUser?.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        created_at: true,
      },
    });

    if (!user) {
      return next(httpErrors.NotFound("User not found"));
    }

    logger.info(
      "controllers - users - user.controller - getUserProfileDetailsController - End"
    );

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "User profile details fetched successfully",
      data: user,
    });
  } catch (error) {
    logger.error(
      "controllers - users - user.controller - getUserProfileDetailsController - Error",
      error
    );
    errorHandling.handlingControllerError(error as AppError, next);
  }
};
