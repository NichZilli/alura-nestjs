import { Injectable } from "@nestjs/common";
import { User } from "./user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

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

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const user = await this.prisma.user.create({
            data: {
              userName: createUserDto.userName,
              email: createUserDto.email,
              password: createUserDto.password,
              fullName: createUserDto.fullName
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
}
