// Analog to contracts on RoR

export abstract class UsersRepository {
    abstract create(nomeDeUsuario: string, email: string, senha: string, nomeCompleto: string): Promise<void>;
}
