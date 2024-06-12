import { Exclude, Expose } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { IsUniqueUserEmail } from "./validators/is-user-email-unique.validator";
import { ApiProperty } from "@nestjs/swagger";


export class User {
    @ApiProperty({ example: 1, description: 'ID of the User' })
    id: string;

    @Expose({
        name: 'userName'
    })
    @IsNotEmpty({
        message: 'userName is required.'
    })
    @IsString({
        message: 'userName needs to be a string.'
    })
    @ApiProperty({ example: 'Nicholas', description: 'The name of the User' })
    userName: string;

    @Expose({
        name: 'email'
    })
    @IsEmail({}, {
        message: 'email needs to be valid.'
    })
    @IsUniqueUserEmail({
        message: 'user email needs to be unique.'
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
        message: 'password is required.'
    })
    @ApiProperty({ example: 'test1234', description: 'The password of the User' })
    password: string;

    @Expose({
        name: 'fullName'
    })
    @IsNotEmpty({
        message: 'fullName is required.'
    })
    @ApiProperty({ example: 'Nicholas Gomez Zilli Castro', description: 'The full name of the User' })
    fullName: string;

    @Expose({
        name: 'joinDate'
    })
    @ApiProperty({ example: '2024/06/10', description: 'The date where the User joined' })
    createdAt: Date;

    @ApiProperty({ example: '2024/06/10', description: 'The date where the User was updated' })
    updatedAt: Date;
}