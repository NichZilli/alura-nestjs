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
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            getUsers: jest.fn().mockResolvedValue([
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
            createUser: jest.fn().mockResolvedValue(mockUser),
            getUser: jest.fn().mockResolvedValue(mockUser),
            updateUser: jest.fn().mockResolvedValue(mockUser),
            deleteUser: jest.fn().mockResolvedValue(mockUser)
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  describe('createUser()', () => {
    it('should create a new user', async () => {
      const createSpy = jest
        .spyOn(service, 'createUser')
        .mockResolvedValueOnce(mockUser);

      await controller.createUser(createAndUpdateUserDto);
      expect(createSpy).toHaveBeenCalledWith(createAndUpdateUserDto);
    });
  });

  describe('getUsers()', () => {
    it('should return an array of users', async () => {
      await expect(controller.getUsers()).resolves.toEqual([
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
      expect(service.getUsers).toHaveBeenCalled();
    });
  });

  describe('getUser()', () => {
    it('should get a user', async () => {
      const getSpy = jest
        .spyOn(service, 'getUser')
        .mockResolvedValueOnce(mockUser);

      await controller.getUser(mockUser.id);
      expect(getSpy).toHaveBeenCalledWith(mockUser.id);
    });
  });

  describe('updateUser()', () => {
    it('should update a user', async () => {
      const updateSpy = jest
        .spyOn(service, 'updateUser')
        .mockResolvedValueOnce(mockUser);

      await controller.updateUser(mockUser.id, createAndUpdateUserDto);
      expect(updateSpy).toHaveBeenCalledWith(mockUser.id, mockUser.userName, mockUser.email, mockUser.password, mockUser.fullName);
    });
  });

  describe('deleteUser()', () => {
    it('should delete a user', async () => {
      const deleteSpy = jest
        .spyOn(service, 'deleteUser')
        .mockResolvedValueOnce(mockUser);

      await controller.deleteUser(mockUser.id);
      expect(deleteSpy).toHaveBeenCalledWith(mockUser.id);
    });
  });
});
