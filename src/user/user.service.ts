import { Injectable, NotFoundException } from "@nestjs/common";
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
    try {
      const updatedUser = await this.prisma.user.update({
        where: { id: id },
        data: {
          userName: userName,
          email: email,
          password: password,
          fullName: fullName,
          updatedAt: new Date(),
        },
      });
  
      if (updatedUser) {
        return {
          id: updatedUser.id,
          userName: updatedUser.userName,
          email: updatedUser.email,
          password: updatedUser.password,
          fullName: updatedUser.fullName,
          createdAt: updatedUser.createdAt,
          updatedAt: updatedUser.updatedAt,
        };
      }
  
      return null;
    } catch (error) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }
  }

  async deleteUser(id: string) {
    return this.prisma.user.delete({ where: { id: id }});
  }
}
