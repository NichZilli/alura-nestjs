import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { FiltroDeExccecaoHttp } from './common/filtros/filtro-de-excecao-http.filter';
import { TransformaRespostaInterceptor } from './core/http/transforma-resposta-interceptor';
import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { PrismaService } from './prisma/prisma.service';
import { UsersRepository } from './repositories/users-repository';
import { PrismaUsersRepository } from './repositories/prisma/prisma-users-repository';

@Module({
  imports: [UserModule],
  controllers: [UserController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: FiltroDeExccecaoHttp
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformaRespostaInterceptor
    },
    UserService,
    PrismaService,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository
    },
  ],
})
export class AppModule {}
