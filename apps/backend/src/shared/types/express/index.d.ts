import { AuthenticatedUser } from "@/shared/types/auth/authenticated-user.ts";

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}
