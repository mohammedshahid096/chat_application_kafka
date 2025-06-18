import { Router } from "express";
import { Authentication } from "../../middlewares/auth.middleware";
import {
  createChatGroupController,
  deleteChatGroupController,
  getChatGroupsController,
  getSingleChatGroupController,
  updateChatGroupController,
} from "../../controllers/chatGroups/chatGroup.controller";
import { createChatGroupValidation } from "../../validators/chatGroupValidator/chatGroup.joi";

const ChatGroupRoutes = Router();

ChatGroupRoutes.route("/create-group").post(
  Authentication,
  createChatGroupValidation,
  createChatGroupController
);

ChatGroupRoutes.route("/chat-groups-list").get(
  Authentication,
  getChatGroupsController
);

ChatGroupRoutes.route("/individual/:chatGroupId")
  .get(Authentication, getSingleChatGroupController)
  .put(Authentication, updateChatGroupController)
  .delete(Authentication, deleteChatGroupController);

export default ChatGroupRoutes;
