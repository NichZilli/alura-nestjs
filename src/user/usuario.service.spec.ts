import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioService } from './user.service';
import { UsuarioController } from './user.controller';

describe('UsuarioService', () => {
  let usuarioService: UsuarioService;
  let usuarioController: UsuarioController;

  // setup training
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
        providers: [UsuarioService],
    }).compile();

    usuarioService = module.get<UsuarioService>(UsuarioService);
  });

  it('should be defined', () => {
    expect(usuarioService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
        const result = [{
            id: 1,
            nomeDeUsuario: 'nicholas',
            email: 'nich.zilli@hotmail.com',
            senha: '123456',
            nomeCompleto: 'Nicholas Gomez Zilli Castro',
            dataDeEntrada: new Date()
        }];

        jest.spyOn(usuarioService, 'listaUsuarios').mockImplementation(() => result);

        expect(await usuarioController.listarUsuarios()).toBe(result);
    })
  })
});
