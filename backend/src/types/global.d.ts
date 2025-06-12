import { UserSchemaType } from "./schemas/users/user";

declare global {
  namespace Express {
    interface Request {
      authUser?: UserSchemaType;
    }
  }
}
