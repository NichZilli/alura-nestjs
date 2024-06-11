// Analog to contracts on RoR

export abstract class UsersRepository {
    abstract create(userName: string, email: string, password: string, fullName: string): Promise<void>;
}
