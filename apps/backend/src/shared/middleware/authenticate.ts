import { Request, Response, NextFunction } from "express";
import { AppError, ErrorCode } from "@/shared/errors/index.js";
import { UserStatus } from "@/generated/prisma/wasm.js";
import { ITokenService } from "@/shared/security/interfaces/token-service.interface.js";
import { IUserRepository } from "@/modules/auth/interfaces/user-repository.interface.js";

export class AuthenticateMiddleware {
  constructor(
    private readonly tokenService: ITokenService,

    private readonly userRepository: IUserRepository,
  ) {}

  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const authorization = req.header("Authorization");

      if (!authorization || !authorization.startsWith("Bearer ")) {
        throw new AppError(
          "Authentication required.",
          401,
          ErrorCode.UNAUTHORIZED,
        );
      }

      const token = authorization.substring(7);

      const payload = await this.tokenService.verifyAccessToken(token);

      const user = await this.userRepository.findById(payload.sub);

      if (!user) {
        throw new AppError(
          "Authentication required.",
          401,
          ErrorCode.UNAUTHORIZED,
        );
      }

      if (user.status !== UserStatus.ACTIVE) {
        throw new AppError(
          "Authentication required.",
          401,
          ErrorCode.UNAUTHORIZED,
        );
      }

      req.user = {
        id: user.id,
        email: user.email,
        roles: payload.roles,
      };

      next();
    } catch (error) {
      next(error);
    }
  }
}
