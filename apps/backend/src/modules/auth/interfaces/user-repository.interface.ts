import { User } from "@/generated/prisma/client.js";

export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;

  findById(id: string): Promise<User | null>;

  create(data: {
    firstName: string;
    lastName: string;
    email: string;
    passwordHash: string;
  }): Promise<User>;
}
