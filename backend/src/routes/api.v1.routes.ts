import { Router } from "express";
import UserRoutes from "./userRoutes/user.routes";
import ChatGroupRoutes from "./chatGroupRoutes/chatGroup.routes";

const ApiV1Routes = Router();

// user
ApiV1Routes.use("/user", UserRoutes);

// chatGroup
ApiV1Routes.use("/chat-group", ChatGroupRoutes);

export default ApiV1Routes;
