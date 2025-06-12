import { Router } from "express";
import {
  loginUserController,
  registerUserController,
  getUserProfileDetailsController,
} from "../../controllers/users/user.controller";
import {
  registerUserValidation,
  loginUserValidation,
} from "../../validators/userValidator/user.joi";
import { Authentication } from "../../middlewares/auth.middleware";

const UserRoutes = Router();

UserRoutes.route("/register").post(
  registerUserValidation,
  registerUserController
);
UserRoutes.route("/login").post(loginUserValidation, loginUserController);

UserRoutes.route("/my-profile").get(
  Authentication,
  getUserProfileDetailsController
);

export default UserRoutes;
