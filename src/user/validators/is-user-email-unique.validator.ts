import { Injectable } from "@nestjs/common";
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
@ValidatorConstraint({ async: true })
export class UniqueUserEmailValidator implements ValidatorConstraintInterface {

    constructor(private prisma: PrismaService) {}

    async validate(email: string, args: ValidationArguments) {
        const user = await this.prisma.user.findUnique({
          where: { email: email },
        });
        return !user;
    }

    defaultMessage(args: ValidationArguments) {
        return 'Name $value is already taken. Please choose another name.';
    }
}

export function IsUniqueUserEmail(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [],
        validator: UniqueUserEmailValidator,
      });
    };
  }