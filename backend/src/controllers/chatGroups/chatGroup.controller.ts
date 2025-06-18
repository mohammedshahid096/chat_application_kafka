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

export const getChatGroupsController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const chatGroups = await prisma.chatGroup.findMany({
      where: {
        user_id: req.authUser?.id,
      },
      orderBy: {
        created_at: "desc",
      },
    });
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Chat groups fetched successfully",
      data: chatGroups,
    });
  } catch (error) {
    logger.error(
      "controllers - chatGroups - chatGroup.controller - getChatGroupsController - Error",
      error
    );
    errorHandling.handlingControllerError(error as AppError, next);
  }
};

export const getSingleChatGroupController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    logger.info(
      "controllers - chatGroups - chatGroup.controller - getSingleChatGroupController - Start"
    );
    const { chatGroupId } = req.params;

    const chatGroup = await prisma.chatGroup.findUnique({
      where: {
        id: chatGroupId,
      },
    });

    if (!chatGroup) {
      return next(httpErrors.NotFound("Chat group not found"));
    }

    logger.info(
      "controllers - chatGroups - chatGroup.controller - getSingleChatGroupController - End"
    );

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Chat group fetched successfully",
      data: chatGroup,
    });
  } catch (error) {
    logger.error(
      "controllers - chatGroups - chatGroup.controller - getSingleChatGroupController - Error",
      error
    );
    errorHandling.handlingControllerError(error as AppError, next);
  }
};

export const updateChatGroupController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    logger.info(
      "controllers - chatGroups - chatGroup.controller - updateChatGroupController - Start"
    );
    const { chatGroupId } = req.params;
    const userId = req.authUser?.id;
    const updateData = req.body;

    const chatGroup = await prisma.chatGroup.findUnique({
      where: { id: chatGroupId },
    });

    if (!chatGroup) {
      return next(httpErrors.NotFound("Chat group not found"));
    }

    if (chatGroup.user_id !== userId) {
      return next(
        httpErrors.Forbidden("You are not authorized to update this chat group")
      );
    }

    const updatedChatGroup = await prisma.chatGroup.update({
      where: { id: chatGroupId },
      data: updateData,
    });

    logger.info(
      "controllers - chatGroups - chatGroup.controller - updateChatGroupController - End"
    );

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Chat group updated successfully",
      data: updatedChatGroup,
    });
  } catch (error) {
    logger.error(
      "controllers - chatGroups - chatGroup.controller - updateChatGroupController - Error",
      error
    );
    errorHandling.handlingControllerError(error as AppError, next);
  }
};

export const deleteChatGroupController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    logger.info(
      "controllers - chatGroups - chatGroup.controller - deleteChatGroupController - Start"
    );
    const { chatGroupId } = req.params;
    const userId = req.authUser?.id;

    const chatGroup = await prisma.chatGroup.findUnique({
      where: { id: chatGroupId },
    });

    if (!chatGroup) {
      return next(httpErrors.NotFound("Chat group not found"));
    }

    if (chatGroup.user_id !== userId) {
      return next(
        httpErrors.Forbidden("You are not authorized to delete this chat group")
      );
    }

    await prisma.chatGroup.delete({
      where: { id: chatGroupId },
    });

    logger.info(
      "controllers - chatGroups - chatGroup.controller - deleteChatGroupController - End"
    );

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Chat group deleted successfully",
    });
  } catch (error) {
    logger.error(
      "controllers - chatGroups - chatGroup.controller - deleteChatGroupController - Error",
      error
    );
    errorHandling.handlingControllerError(error as AppError, next);
  }
};
