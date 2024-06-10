import { Controller, Post, Body, Get, Param, HttpStatus, NotFoundException, HttpCode, Query, Put, Delete } from '@nestjs/common';
import { NestResponse } from '../core/http/nest-response';
import { NestResponseBuilder } from '../core/http/nest-response-builder';
import { Usuario } from './usuario.entity';
import { UsuarioService } from './usuario.service';
import { PrismaService } from '../database/prisma.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

// @ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UsuarioController {

    constructor(private readonly usuarioService: UsuarioService) {}

    @ApiOperation({ summary: 'Get a User by ID' })
    @ApiResponse({ status: 200, description: 'OK', type: Usuario })
    @Get(':idDoUsuario')
    public async listaUsuario(@Param('idDoUsuario') idDoUsuario: number): Promise<Usuario> {
        return this.usuarioService.buscaPorID(+idDoUsuario);
    }

    @ApiOperation({ summary: 'Get all Users' })
    @ApiResponse({ status: 200, description: 'OK', type: Usuario })
    @Get()
    public async listarUsuarios() {
        return this.usuarioService.listaUsuarios();
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
