import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user/user.controller';
import { CreateAndUpdateUserDto } from '../user/dto/create-and-update-user.dto';
import { UserService } from '../user/user.service';

describe('User Controller', () => {
  let controller: UserController;
  let service: UserService;
  const createAndUpdateUserDto: CreateAndUpdateUserDto = {
    userName: 'user_name',
    email: 'user@email.com',
    password: 'test123',
    fullName: 'User Name'
  };

  const mockUser = {
    userName: 'user_name',
    email: 'user@email.com',
    password: 'test123',
    fullName: 'User Name',
    id: 'a id',
    createdAt: new Date(),
    updatedAt: new Date()
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UserService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([
              {
                userName: 'user_name',
                email: 'user@email.com',
                password: 'test123',
                fullName: 'User Name'
              },
              {
                userName: 'user_name_two',
                email: 'user_two@email.com',
                password: 'test2123',
                fullName: 'User Name Two'
              },
              {
                userName: 'user_name_three',
                email: 'user_three@email.com',
                password: 'test123323',
                fullName: 'User Name Three'
              },
            ]),
            create: jest.fn().mockResolvedValue(createAndUpdateUserDto),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  describe('create()', () => {
    it('should create a new user', async () => {
      const createSpy = jest
        .spyOn(service, 'createUser')
        .mockResolvedValueOnce(mockUser);

      await controller.createUser(createAndUpdateUserDto);
      expect(createSpy).toHaveBeenCalledWith(createAndUpdateUserDto);
    });
  });

  describe('findAll()', () => {
    it('should return an array of users', async () => {
      expect(controller.getUsers()).resolves.toEqual([
        {
          userName: 'user_name',
          email: 'user@email.com',
          password: 'test123',
          fullName: 'User Name'
        },
        {
          userName: 'user_name_two',
          email: 'user_two@email.com',
          password: 'test2123',
          fullName: 'User Name Two'
        },
        {
          userName: 'user_name_three',
          email: 'user_three@email.com',
          password: 'test123323',
          fullName: 'User Name Three'
        },
      ]);
      expect(service.getUsers()).toHaveBeenCalled();
    });
  });
});