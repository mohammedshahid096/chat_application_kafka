import { Router } from "express";
import {
  loginUserController,
  registerUserController,
} from "../../controllers/users/user.controller";
import {
  registerUserValidation,
  loginUserValidation,
} from "../../validators/userValidator/user.joi";

const UserRoutes = Router();

UserRoutes.route("/register").post(
  registerUserValidation,
  registerUserController
);
UserRoutes.route("/login").post(loginUserValidation, loginUserController);

export default UserRoutes;
