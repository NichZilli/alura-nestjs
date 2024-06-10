import { PrismaService } from '../../prisma/prisma.service';
import { UsersRepository } from "../users-repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}

  async create(userName: string, email: string, password: string, fullName: string): Promise<void> {
    await this.prisma.user.create({
        data: {
            userName,
            email,
            password,
            fullName
        }
    })
  }
}
