import { Injectable } from "@nestjs/common";
import { Usuario } from "./usuario.entity";
import { CreateUserDto } from "./create-user.dto";

@Injectable()
export class UsuarioService {
    private usuarios: Array<Usuario> = [];

    public cria(usuario: CreateUserDto): Usuario {
        this.usuarios.push(usuario);

        return usuario;
    }

    public buscaPorID(id: number): Usuario {
        return this.usuarios[id];
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
