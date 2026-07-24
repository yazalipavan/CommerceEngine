import { IAuthService } from "@/modules/auth/interfaces/auth-service.interface.js";
import { LoginRequestDto } from "@/modules/auth/dtos/login-request.dto.js";
import { RegisterRequestDto } from "@/modules/auth/dtos/register-request.dto.js";
import { LoginResponseDto } from "@/modules/auth/dtos/login-response.dto.js";
import { IPasswordService } from "@/shared/security/interfaces/password-service.interface.js";
import { IUserRepository } from "@/modules/auth/interfaces/user-repository.interface.js";
import { ITokenService } from "@/shared/security/interfaces/token-service.interface.js";
import { IRefreshTokenRepository } from "../interfaces/refreshtoken-repository.interface.js";
import { AppError, ErrorCode } from "@/shared/errors/index.js";
import { UserStatus } from "@/generated/prisma/wasm.js";
import { IRefreshResultResponseDto } from "../dtos/refreshresult-response.dto.js";

export class AuthService implements IAuthService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly passwordService: IPasswordService,
    private readonly tokenService: ITokenService,
    private readonly refreshTokenRepository: IRefreshTokenRepository,
  ) {}

  async register(data: RegisterRequestDto): Promise<void> {
    const existingUser = await this.userRepository.findByEmail(data.email);

    if (existingUser) {
      throw new AppError(
        "Email is already registered",
        409,
        ErrorCode.CONFLICT,
      );
    }

    const passwordHash = await this.passwordService.hash(data.password);

    await this.userRepository.create({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      passwordHash,
    });
  }

  async login(
    dto: LoginRequestDto,
    rememberMe: boolean,
  ): Promise<LoginResponseDto> {
    const user = await this.userRepository.findByEmail(dto.email);

    if (!user) {
      throw new AppError(
        "Invalid email or password",
        401,
        ErrorCode.UNAUTHORIZED,
      );
    }
    const validPassword = await this.passwordService.verify(
      dto.password,
      user.passwordHash,
    );

    if (!validPassword) {
      throw new AppError(
        "Invalid email or password",
        401,
        ErrorCode.UNAUTHORIZED,
      );
    }
    if (!user.isEmailVerified) {
      throw new AppError("Please verify your email.", 403, ErrorCode.FORBIDDEN);
    }
    if (user.status !== UserStatus.ACTIVE) {
      throw new AppError("Account is unavailable.", 403, ErrorCode.FORBIDDEN);
    }

    const accessToken = await this.tokenService.generateAccessToken({
      sub: user.id,
      email: user.email,
      roles: [],
    });

    const refreshToken = await this.tokenService.generateRefreshToken(
      {
        sub: user.id,
        tokenId: crypto.randomUUID(),
        rememberMe: rememberMe,
      },
      rememberMe,
    );

    const refreshTokenHash = await this.passwordService.hash(
      refreshToken.token,
    );

    await this.refreshTokenRepository.upsert(
      user.id,

      refreshTokenHash,

      refreshToken.expiresAt,
    );

    return {
      accessToken: accessToken.token,
      refreshToken: refreshToken.token,
      user: {
        id: user.id,

        firstName: user.firstName,

        lastName: user.lastName,

        email: user.email,
      },
    };
  }

  async refresh(refreshToken: string): Promise<IRefreshResultResponseDto> {
    const payload = await this.tokenService.verifyRefreshToken(refreshToken);

    const stored = await this.refreshTokenRepository.findByUserId(payload.sub);

    if (!stored) {
      throw new AppError("Invalid refresh token.", 401, ErrorCode.UNAUTHORIZED);
    }

    const valid = await this.passwordService.verify(
      refreshToken,
      stored.tokenHash,
    );

    if (!valid) {
      throw new AppError("Invalid refresh token.", 401, ErrorCode.UNAUTHORIZED);
    }

    const user = await this.userRepository.findById(payload.sub);

    if (!user) {
      throw new AppError("User not found.", 404, ErrorCode.NOT_FOUND);
    }

    const accessToken = await this.tokenService.generateAccessToken({
      sub: user.id,

      email: user.email,

      roles: [],
    });

    const newRefreshToken = await this.tokenService.generateRefreshToken(
      {
        sub: user.id,

        tokenId: crypto.randomUUID(),
        rememberMe: payload.rememberMe,
      },

      payload.rememberMe,
    );

    const hash = await this.passwordService.hash(newRefreshToken.token);

    await this.refreshTokenRepository.upsert(
      user.id,

      hash,

      newRefreshToken.expiresAt,
    );

    return {
      accessToken: accessToken.token,

      refreshToken: newRefreshToken.token,
      refreshExpiresAt: newRefreshToken.expiresAt,
    };
  }

  async logout(refreshToken?: string): Promise<void> {
    if (!refreshToken) {
      return;
    }

    try {
      const payload = await this.tokenService.verifyRefreshToken(refreshToken);

      await this.refreshTokenRepository.deleteByUserId(payload.sub);
    } catch {
      // Logout should always succeed.
    }
  }
}
