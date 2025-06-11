import { Router } from "express";
import { registerUserController } from "../../controllers/users/user.controller";
import { registerUserValidation } from "../../validators/userValidator/user.joi";

const UserRoutes = Router();

// UserRoutes.route("/login").post(LoginUserValidation, LoginUserController);
UserRoutes.route("/register").post(
  registerUserValidation,
  registerUserController
);

export default UserRoutes;
