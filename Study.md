# Nest.JS

## Controller
Recebe requisições do lado do cliente, e retorna uma resposta a ele. As rotas controlam sobre qual controlador receberá quais requisições. Para criar um controlador, usa-se classes e decoradores, nos quais eles associam classes com os metadados obrigatórios e habilita o Nest a criar uma um mapa de rotas.

Exemplos de decoradores úteis no controlador:
```
@Get()
@Post()
@Put()
@Patch()
@Delete()
@Request()
@Response()
@Next()
@Session()
@Param(key?: string)
@Body(key?: string)
@Query(key?: string)
@Headers(name?: string)
@HttpCode()
@Redirect()
@Controller({ host: 'admin.example.com' })
@HostParam()
```

Exemplos de construções de controladores:
```
import { Controller, Get, Query, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { CreateCatDto, UpdateCatDto, ListAllEntities } from './dto';

@Controller('cats')
export class CatsController {
  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    return 'This action adds a new cat';
  }

  @Get()
  findAll(@Query() query: ListAllEntities) {
    return `This action returns all cats (limit: ${query.limit} items)`;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} cat`;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}
```
```
import { Controller, Get, Post, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Controller('cats')
export class CatsController {
  @Post()
  create(@Res() res: Response) {
    res.status(HttpStatus.CREATED).send();
  }

  @Get()
  findAll(@Res() res: Response) {
     res.status(HttpStatus.OK).json([]);
  }
}
```

## Provider
Conceito fundamental no Nest, nos quais várias classes podem ser tratadas como providers, como services, repositories, factories, helpers, entre outros. Estes são injetados como dependência, no qual são objetos com vários relacionamentos entre outros.
## Service
Responsável pelo armazenamento e recebimento de dados.
```
import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }
}
```
```
export interface Cat {
    name: string;
    age: number;
    breed: string;
}
```
```
constructor(private catsService: CatsService) {}

@Post()
async create(@Body() createCatDto: CreateCatDto) {
  this.catsService.create(createCatDto);
}
```

## Scope
```
# depended scope
@Injectable({ scope: Scope.REQUEST, useClass: CacheManager, provide: 'CACHE_MANAGER' })
export class CatsService {
    constructor(@Inject(REQUEST) private request: Request) {}
}
# REQUEST for GraphQL
```

```
# for instance in logging or metrics providers
import { Inject, Injectable, Scope } from '@nestjs/common';
import { INQUIRER } from '@nestjs/core';

@Injectable({ scope: Scope.TRANSIENT })
export class HelloService {
  constructor(@Inject(INQUIRER) private parentClass: object) {}

  sayHello(message: string) {
    console.log(`${this.parentClass?.constructor?.name}: ${message}`);
  }
}

import { Injectable } from '@nestjs/common';
import { HelloService } from './hello.service';

@Injectable()
export class AppService {
  constructor(private helloService: HelloService) {}

  getRoot(): string {
    this.helloService.sayHello('My name is getRoot');

    return 'Hello world!';
  }
}
```

## Custom providers
Conceito de Injeção de Dependência -> Inversão de controle

No service, o decorador @Injectable() declara a classe como uma que pode ser manejada pelo container de IdC do Nest

No controlador, se declara a dependência do token do service com o injetor de construção

No arquivo `app.module.ts`, associa o token do service com a classe do arquivo

```
import { Module } from '@nestjs/common';
import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
})
export class AppModule {}
```
## Repository
## Factory
## Helper
## decorator
## singleton
## interceptor
## middleware