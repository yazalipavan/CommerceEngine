export interface LoginResponseDto {
  accessToken: string;

  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  refreshToken: string;
}
