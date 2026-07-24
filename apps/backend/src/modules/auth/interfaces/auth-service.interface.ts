import { LoginRequestDto } from "@/modules/auth/dtos/login-request.dto.js";
import { RegisterRequestDto } from "@/modules/auth/dtos/register-request.dto.js";
import { LoginResponseDto } from "@/modules/auth/dtos/login-response.dto.js";
import { IRefreshResultResponseDto } from "../dtos/refreshresult-response.dto.js";

export interface IAuthService {
  register(data: RegisterRequestDto): Promise<void>;

  login(dto: LoginRequestDto, rememberMe: boolean): Promise<LoginResponseDto>;

  refresh(refreshToken: string): Promise<IRefreshResultResponseDto>;

  logout(refreshToken?: string): Promise<void>;
}
