# Estudo geral sobre o Nest.JS

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
Padrão de design que abstrai a camada de dados, centralizando o local para interagir com a fonte de dados. Esse padrão é geralmente usado para administrar os acessos lógicos aos dados, facilitando a troca de fonte de dados sem mudar a regra de negócio. Entre os benefícios de usar os repositórios, temos a abstração dos dados, manutenção, consistência e testabilidade, pois facilita a escrita dos testes unitários por associação a mocks e stubs para a camada de dados. O conceito do repository é usado de forma separada quanto está usando o um ORM como o TypeORM por exemplo. Já quando se usa o Prisma, o equivalente dele acaba sendo o próprio Service.

## Factory
No NestJS o padrão de design é usado para criar instâncias de objetos. Os factories encapsulam a instanciação da lógica, permitindo maior flexibilidade e manutenção dos códigos. No NestJS, eles são usados para criar e configurar serviços, provedores, ou outros objetos dinamicamente, baseado na configuração em tempo real ou nas configurações de ambiente.

## Helper
Os helper no NestJS são funções ou classes de utilidade que provem funcionalidades comuns para várias partes da aplicação. Eles encapsulam tarefas genéricas e repetitivas, promovendo reusabilidade e manutenibilidade do código. Os helpers pode performar tarefas como transformação de dados, validação, logging e outras operações de utilidade que não pertencem ao específico serviço ou módulo.

## Decorator
Decorators é um recurso fundamental do NestJS, inspirado no padrão de decoradores na programação orientada a objetos. Há tipos de declarações especiais que podem ser adicionados as classes, métodos, propriedades ou parâmetros. Decoradores permitem modificar o comportamento dos elementos decorados, adicionando metadados ou comportamentos de forma declarativa.

Tipos de decorators:
- Decoradores de Classe: Usado para anotar classes. Exemplos comuns incluem: @Controller, @Injectable e @Module.
- Decoradores de Métodos: Usado para anotar métodos. Exemplos comuns incluem: @Get, @Post e @Put.
- Decoradores de Propriedade: Usado para anotar propriedades sem uma classe. Um exemplo é o @Inject.
- Decoradores de Parâmetros: Usado para anotar parâmetros do método. Exemplos comuns incluem @Param, @Body e @Query.

Decorators usados normalmente no NestJS:
@Controller: Define um controller.
@Get, @Post, @Put, @Delete, etc.: Define métodos HTTP.
@Injectable: Marca uma classe como um provider que pode ser injetado como dependência.
@Module: Define o módulo.
@Param, @Query, @Body, etc.: Extrai parâmetros de requisição das rotas.
@UseGuards, @UseInterceptors, @UsePipes: Aplica guards, interceptors e pipes aos controladores ou métodos.

## Singleton
Um singleton é um padrão de design que garante que a classe tenha uma única instância e provem um ponto global para acessar ele. No contexto do NestJS, singletons são particularmente úteis para gerenciar recursos compartilhados, como conexões de banco de dados, configurações ou serviços de manutenção de estado.

No NestJS, providers (serviços, repositórios, etc.) são singletons por padrão. Quando um provider é registrado com o sistema de dependência de injeção do NestJS, o Nest garante que uma única instância do provider é criado e compartilhado pela aplicação.

## Interceptor
Os interceptors no NestJS é um recurso poderoso usado para interceptar e manipular a execução de requests de entrada e respostas de saída. Ele provem uma forma para adicionar preocupações transversais como loggin, autenticação, caching, entre outros, de uma forma limpa e reusável.

Conceitos Chaves:
- Interceptação: Interceptadores podem performar ações antes ou depois da execução do manipulador de rota.
- Transformação: Transforma a data de entradas e saídas.
- Vinculação: Interceptors são vinculados globalmente, no nível do controlador, ou no nível da manipulação de rota.
- Interface de interceptação do Nest: Implementa a interface de interceptação do Nest, o que requer uma definição de um método de interceptação.

## Middleware
As funções do middleware é uma parte integral no processo da requisição da pipeline no NestJS. Eles são funções que executam antes dos recursos compartilhados serem invocados, permitindo modificar objetos de requisição e a resposta para operar outras ações.

Características chaves do Middleware
Ordem de execução: Funções de middleware são executadas sequencialmente na ordem que são definidas.
Ciclo de requisição-resposta: Middleware pode modificar os objetos de requisição e resposta, terminando o ciclo de requisição-resposta, ou passa o controle para a próxima função do middleware.
Casos de uso: casos de uso comuns incluem logging, autenticação, autorização, validação de requisição e análise corporal.

Tipos de Middleware
Middleware de aplicação por nível: Definido no módulo da aplicação principal, e aplica para todas as rotas.
Middleware por rotas específicas: Aplicado para rotas específicas ou controladores.
Middleware funcional: Funções simples que pegam req, res e next como argumentos.
Middleware baseado em classes: Classes que implementam a interface NestMiddleware.
