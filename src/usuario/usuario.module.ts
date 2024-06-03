import { Module } from "@nestjs/common";
import { UsuarioController } from "./usuario.controller";
import { UsuarioService } from "./usuario.service";
import { IsNomeDeUsuarioUnicoConstraint } from "./is-nome-de-usuario-unico.validator";
import { PrismaService } from "../database/prisma.service";

@Module({
    controllers: [UsuarioController],
    providers: [UsuarioService, PrismaService, IsNomeDeUsuarioUnicoConstraint]
})
export class UsuarioModule {}