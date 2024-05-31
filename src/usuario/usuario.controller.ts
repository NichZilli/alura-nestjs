import { Controller, Post, Body, Get, Param, HttpStatus, NotFoundException, HttpCode, Query, Put, Delete } from '@nestjs/common';
import { NestResponse } from '../core/http/nest-response';
import { NestResponseBuilder } from '../core/http/nest-response-builder';
import { Usuario } from './usuario.entity';
import { UsuarioService } from './usuario.service';

@Controller('users')
export class UsuarioController {

    constructor(private usuarioService: UsuarioService) {}

    @Get()
    public listarTodos(): Usuario[] {
      const usuarios = this.usuarioService.listaUsuarios();

      if(!usuarios) {
        throw new NotFoundException({
            statusCode: HttpStatus.NOT_FOUND,
            message: 'Nenhum usuário encontrado.'
        });
      }

      return usuarios;
    }

    @Get(':nomeDeUsuario')
    public buscaPorNomeDeUsuario(@Param('nomeDeUsuario') nomeDeUsuario: string) {
        const usuarioEncontrado = this.usuarioService.buscaPorNomeDeUsuario(nomeDeUsuario);
        
        if(!usuarioEncontrado) {
            throw new NotFoundException({
                statusCode: HttpStatus.NOT_FOUND,
                message: 'Usuário não encontrado.'
            });
        }

        return usuarioEncontrado;
    }

    @Post()
    public cria(@Body() usuario: Usuario): NestResponse {
        
        const usuarioCriado = this.usuarioService.cria(usuario);
        
        return new NestResponseBuilder()
                .comStatus(HttpStatus.CREATED)
                .comHeaders({
                    'Location': `/users/${usuarioCriado.nomeDeUsuario}`
                })
                .comBody(usuarioCriado)
                .build();
    }

    @Put(':idDeUsuario')
    public editaPorIdDeUsuario(@Param('idDeUsuario') idDeUsuario: number, @Body('nomeDeUsuario') nomeDeUsuario: string, @Body('email') email: string, @Body('senha') senha: string, @Body('nomeCompleto') nomeCompleto: string) {
        const usuarioAtualizado = this.usuarioService.editaPorIdDeUsuario(idDeUsuario, nomeDeUsuario, email, senha, nomeCompleto);

        if(!usuarioAtualizado) {
            throw new NotFoundException({
                statusCode: HttpStatus.NOT_FOUND,
                message: 'Usuário não encontrado.'
            });
        }

        return usuarioAtualizado;
    }

    @Delete(':idDeUsuario')
    public removerUsuario(@Param('idDeUsuario') idDeUsuario: number): NestResponse {
        const usuarioRemovido = this.usuarioService.removerUsuario(idDeUsuario);
        
        return new NestResponseBuilder()
                .comStatus(HttpStatus.ACCEPTED)
                .comHeaders({
                    'Location': `/users/${usuarioRemovido}`
                })
                .build();
    }
}
