import { Response, NextFunction } from "express";
import httpErrors from "http-errors";
import errorHandling, { AppError } from "../../utils/errorHandling";
import logger from "../../config/logger.config";
import _ from "lodash";
import { AuthenticatedRequest } from "../../types";
import { CreateChatGroupBodyType } from "../../types/dto/chatGroup.dto";
import prisma from "../../config/db.config";

export const createChatGroupController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const body: CreateChatGroupBodyType = req.body;
    const userId = req.authUser?.id;
    const isGroupExist = await prisma.chatGroup.findMany({
      where: {
        title: body.title,
      },
    });

    if (_.size(isGroupExist) > 0)
      return next(httpErrors.BadRequest("group already exist"));

    body.user_id = userId as string;

    const newGroup = await prisma.chatGroup.create({ data: body });

    res.status(200).json({
      success: true,
      statusCode: 201,
      message: "successfully new user is created",
      data: newGroup,
    });
  } catch (error) {
    logger.error(
      "controllers - users - user.controller - registerController - Error",
      error
    );
    errorHandling.handlingControllerError(error as AppError, next);
  }
};
