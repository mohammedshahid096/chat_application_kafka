import { Router } from "express";
import { Authentication } from "../../middlewares/auth.middleware";
import { createChatGroupController } from "../../controllers/chatGroups/chatGroup.controller";
import { createChatGroupValidation } from "../../validators/chatGroupValidator/chatGroup.joi";

const ChatGroupRoutes = Router();

ChatGroupRoutes.route("/create-group").post(
  Authentication,
  createChatGroupValidation,
  createChatGroupController
);

export default ChatGroupRoutes;
