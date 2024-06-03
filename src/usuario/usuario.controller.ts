import { Controller, Post, Body, Get, Param, HttpStatus, NotFoundException, HttpCode, Query, Put, Delete } from '@nestjs/common';
import { NestResponse } from '../core/http/nest-response';
import { NestResponseBuilder } from '../core/http/nest-response-builder';
import { Usuario } from './usuario.entity';
import { UsuarioService } from './usuario.service';
import { PrismaService } from '../database/prisma.service';

@Controller('users')
export class UsuarioController {

    constructor(private prisma: PrismaService) {}

    @Get(':idDoUsuario')
    public async listaUsuario(@Param('idDoUsuario') idDoUsuario: number) {
        const usuario = await this.prisma.usuario.findUnique({
            where: {
                id: idDoUsuario
            }
        });

        return {
            usuario
        };
    }

    @Get()
    public async listarUsuarios() {
        const usuarios = await this.prisma.usuario.findMany();

        return { usuarios };
    }

    // @Post()
    // async criaUsuario(@Body() body: CreateUserBody) {
    //     const { nomeDeUsuario, email, senha, nomeCompleto, dataDeEntrada } = body;

    //     await this.userRepository.create(nomeDeUsuario, email, senha, nomeCompleto, dataDeEntrada);
    // }

    // @Post()
    // async criaUsuario(@Body() usuario: Prisma.UserCreateInput) {
    //      return this.usuarioService.cria(usuario);
    // }
}
