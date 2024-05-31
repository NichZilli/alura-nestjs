import { Injectable } from "@nestjs/common";
import { Usuario } from "./usuario.entity";

@Injectable()
export class UsuarioService {
    private usuarios: Array<Usuario> = [{
        id: 1,
        nomeDeUsuario: 'nicholas',
        email: 'nich.zilli@hotmail.com',
        senha: '123456',
        nomeCompleto: 'Nicholas Gomez Zilli Castro',
        dataDeEntrada: new Date()
    }];

    public cria(usuario: Usuario): Usuario {
        this.usuarios.push(usuario);

        return usuario;
    }

    public buscaPorNomeDeUsuario(nomeDeUsuario: string): Usuario {
        return this.usuarios.find(usuario => usuario.nomeDeUsuario == nomeDeUsuario);
    }

    public listaUsuarios(): Usuario[] {
        return this.usuarios;
    }

    public editaPorIdDeUsuario(idDeUsuario: number, nomeDeUsuario: string, email: string, senha: string, nomeCompleto: string): Usuario {
      const usuario = this.usuarios.find((usuario) => usuario.id === idDeUsuario);

      if (usuario) {
        usuario.nomeDeUsuario = nomeDeUsuario;
        usuario.email = email;
        usuario.senha = senha;
        usuario.nomeCompleto = nomeCompleto;
      }

      return usuario;
    }

    public removerUsuario(id: number): void {
        this.usuarios = this.usuarios.filter((usuario) => usuario.id !== id);
    }
}