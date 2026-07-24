import { Request, Response } from "express";

import { IAuthService } from "@/modules/auth/interfaces/auth-service.interface.js";
import { LoginRequestDto } from "@/modules/auth/dtos/login-request.dto.js";
import { RegisterRequestDto } from "@/modules/auth/dtos/register-request.dto.js";
import { config } from "@/config/index.js";
import { AppError, ErrorCode } from "@/shared/errors/index.js";
import { createRefreshTokenCookieOptions } from "@/shared/constants/cookies.js";

export class AuthController {
  constructor(private readonly authService: IAuthService) {}

  async register(req: Request<{}, {}, RegisterRequestDto>, res: Response) {
    await this.authService.register(req.body);

    return res.status(201).json({
      success: true,
    });
  }

  async login(req: Request<{}, {}, LoginRequestDto>, res: Response) {
    const { refreshToken, ...result } = await this.authService.login(
      req.body,
      req.body.rememberMe ?? false,
    );

    const ONE_DAY = 24 * 60 * 60 * 1000;
    const maxAge = req.body.rememberMe ? 30 * ONE_DAY : 7 * ONE_DAY;

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: config.app.nodeEnv === "production",
      sameSite: "strict",
      path: "/api/v1/auth/refresh",
      maxAge,
    });

    return res.json({ success: true, ...result });
  }

  async refresh(req: Request, res: Response) {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      throw new AppError("Refresh token missing", 401, ErrorCode.UNAUTHORIZED);
    }

    const result = await this.authService.refresh(refreshToken);

    res.cookie(
      "refreshToken",
      result.refreshToken,
      createRefreshTokenCookieOptions(result.refreshExpiresAt),
    );

    return res.json({
      success: true,
      accessToken: result.accessToken,
    });
  }

  async logout(req: Request, res: Response): Promise<Response> {
    const refreshToken = req.cookies.refreshToken;

    await this.authService.logout(refreshToken);

    res.clearCookie(
      "refreshToken",
      createRefreshTokenCookieOptions(new Date()),
    );

    return res.sendStatus(204);
  }
}
