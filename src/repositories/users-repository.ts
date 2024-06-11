// Analog to contracts on RoR

export abstract class UsersRepository {
    abstract create(nomeDeUser: string, email: string, senha: string, nomeCompleto: string): Promise<void>;
}
