import { UserSchemaType } from "./schemas/users/user";
import { Request } from "express";
export interface AuthenticatedRequest extends Request {
  authUser?: UserSchemaType;
}
