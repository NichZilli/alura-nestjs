import { Module } from "@nestjs/common";
import { UsuarioController } from "./user.controller";
import { UserService } from "./user.service";
import { UniqueUserEmailValidator } from "./validators/is-user-email-unique.validator";
import { PrismaService } from "../prisma/prisma.service";

@Module({
    controllers: [UsuarioController],
    providers: [UserService, PrismaService, UniqueUserEmailValidator]
})
export class UsuarioModule {}