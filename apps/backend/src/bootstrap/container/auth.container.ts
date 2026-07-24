import { AuthController } from "@/modules/auth/controllers/auth.controller.js";
import { PrismaRefreshTokenRepository } from "@/modules/auth/repositories/prisma-refreshtoken.repository.js";
import { PrismaUserRepository } from "@/modules/auth/repositories/prisma-user.repository.js";
import { AuthService } from "@/modules/auth/services/auth.service.js";
import { AuthenticateMiddleware } from "@/shared/middleware/authenticate.js";
import { AuthorizeMiddleware } from "@/shared/middleware/authorize.js";
import { JwtTokenService } from "@/shared/security/jwt-token.service.js";
import { PasswordService } from "@/shared/security/password.service.js";

const userRepository = new PrismaUserRepository();

const passwordService = new PasswordService();

const tokenService = new JwtTokenService();

const refreshTokenRepository = new PrismaRefreshTokenRepository();

const authService = new AuthService(
  userRepository,
  passwordService,
  tokenService,
  refreshTokenRepository,
);

export const authController = new AuthController(authService);

export const authenticateMiddleware = new AuthenticateMiddleware(
  tokenService,
  userRepository,
);

export const authorizeMiddleware = new AuthorizeMiddleware();
