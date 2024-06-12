import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UniqueUserEmailValidator } from "./validators/is-user-email-unique.validator";
import { PrismaService } from "../prisma/prisma.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User } from "./user.entity";
import { UserSchema } from "./schemas/user.schema";

@Module({
    imports: [MongooseModule.forFeature([
        {
          name: User.name,
          schema: UserSchema
        }
      ]),
    ],
    controllers: [UserController],
    providers: [UserService, PrismaService, UniqueUserEmailValidator]
})
export class UserModule {}