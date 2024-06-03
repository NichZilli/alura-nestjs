import { PrismaService } from '../../database/prisma.service';
import { UsersRepository } from "../users-repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}

  async create(nomeDeUsuario: string, email: string, senha: string, nomeCompleto: string): Promise<void> {
    await this.prisma.usuario.create({
        data: {
            nomeDeUsuario,
            email,
            senha,
            nomeCompleto
        }
    })
  }
}
