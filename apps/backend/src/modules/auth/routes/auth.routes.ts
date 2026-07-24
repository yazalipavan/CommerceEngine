import { Router } from "express";

import { loginRequestSchema } from "@/modules/auth/dtos/login-request.dto.js";
import { registerRequestSchema } from "@/modules/auth/dtos/register-request.dto.js";
import { authController } from "@/bootstrap/container/auth.container.js";

import { validateRequest } from "@/shared/middleware/validate-request.js";

export const authRouter = Router();

authRouter.post(
  "/register",
  validateRequest(registerRequestSchema),
  authController.register.bind(authController),
);

authRouter.post(
  "/login",
  validateRequest(loginRequestSchema),
  authController.login.bind(authController),
);

authRouter.post("/refresh", authController.refresh.bind(authController));

authRouter.post("/logout", authController.logout.bind(authController));
