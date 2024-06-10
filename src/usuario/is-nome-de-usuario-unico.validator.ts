import { Injectable } from "@nestjs/common";
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { UsuarioService } from "./usuario.service";

@Injectable()
@ValidatorConstraint()
export class IsNomeDeUsuarioUnicoConstraint implements ValidatorConstraintInterface {
    
    constructor(private usuarioService: UsuarioService) {}
    
    validate(idDeUsuario: number, validationArguments?: ValidationArguments): boolean | Promise<boolean> {
        return !!!this.usuarioService.buscaPorID(idDeUsuario);
    }
    
}

export function IsNomeDeUsuarioUnico(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsNomeDeUsuarioUnicoConstraint,
        });
    };
}