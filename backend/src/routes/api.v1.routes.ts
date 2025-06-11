import { Router } from "express";
import UserRoutes from "./userRoutes/user.routes";

const ApiV1Routes = Router();

ApiV1Routes.use("/user", UserRoutes);

export default ApiV1Routes;
