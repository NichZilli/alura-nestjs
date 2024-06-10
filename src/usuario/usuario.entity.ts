import { Exclude, Expose } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { IsNomeDeUsuarioUnico } from "./is-nome-de-usuario-unico.validator";
import { ApiProperty } from "@nestjs/swagger";


export class Usuario {
    @ApiProperty({ example: 1, description: 'ID of the User' })
    id: number;

    @Expose({
        name: 'userName'
    })
    @IsNomeDeUsuarioUnico({
        message: 'nomeDeUsuario precisa ser único.'
    })
    @IsNotEmpty({
        message: 'nomeDeUsuario é obrigatório.'
    })
    @IsString({
        message: 'nomeDeUsuario precisa ser uma string.'
    })
    @ApiProperty({ example: 'Nicholas', description: 'The name of the User' })
    nomeDeUsuario: string;

    @Expose({
        name: 'email'
    })
    @IsEmail({}, {
        message: 'email precisa ser um endereço de email válido.'
    })
    @ApiProperty({ example: 'nich.zilli@hotmail.com', description: 'The email of the User' })
    email: string;

    @Expose({
        name: 'password'
    })
    @Exclude({
        toPlainOnly: true
    })
    @IsNotEmpty({
        message: 'senha é obrigatório.'
    })
    @ApiProperty({ example: 'test1234', description: 'The password of the User' })
    senha: string;

    @Expose({
        name: 'fullName'
    })
    @IsNotEmpty({
        message: 'nomeCompleto é obrigatório.'
    })
    @ApiProperty({ example: 'Nicholas Gomez Zilli Castro', description: 'The full name of the User' })
    nomeCompleto: string;

    @Expose({
        name: 'joinDate'
    })
    @ApiProperty({ example: '2024/06/10', description: 'The date where the User joined' })
    dataDeEntrada: Date;
}