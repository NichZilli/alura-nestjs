import { Injectable } from "@nestjs/common";
import { User } from "./user.entity";
import { CreateAndUpdateUserDto } from "./dto/create-and-update-user.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(CreateAndUpdateUserDto: CreateAndUpdateUserDto): Promise<User> {
    const user = await this.prisma.user.create({
        data: {
          userName: CreateAndUpdateUserDto.userName,
          email: CreateAndUpdateUserDto.email,
          password: CreateAndUpdateUserDto.password,
          fullName: CreateAndUpdateUserDto.fullName
        },
      });
      return {
        id: user.id,
        userName: user.userName,
        email: user.email,
        password: user.password,
        fullName: user.fullName,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      };
  }

  async getUsers(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async getUser(id: string): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: { id: id }
    });

    if (user) {
      return {
        id: user.id,
        userName: user.userName,
        email: user.email,
        password: user.password,
        fullName: user.fullName,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      };
    }

    return null;
  }

  async updateUser(id: string, userName: string, email: string, password: string, fullName: string): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: { id: id }
    });

    if (user) {
      user.userName = userName;
      user.email = email;
      user.password = password;
      user.fullName = fullName;

      return {
        id: user.id,
        userName: user.userName,
        email: user.email,
        password: user.password,
        fullName: user.fullName,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      };
    }

    return null;
  }
}
