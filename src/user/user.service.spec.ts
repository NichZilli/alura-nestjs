import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { UserService } from '../user/user.service';
import { User } from '../user/schemas/user.schema';
import { PrismaService } from '../prisma/prisma.service';

const mockUser = {
  userName: 'user_name',
  email: 'user@email.com',
  password: 'test123',
  fullName: 'User Name'
};

describe('UserService', () => {
  let service: UserService;
  let model: Model<User>;

  const usersArray = [
    {
      userName: 'user_name',
      email: 'user@email.com',
      password: 'test123',
      fullName: 'User Name'
    },
    {
      userName: 'user_name_two',
      email: 'user_two@email.com',
      password: 'user123',
      fullName: 'User Name Two'
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken('User'),
          useValue: {
            new: jest.fn().mockResolvedValue(mockUser),
            constructor: jest.fn().mockResolvedValue(mockUser),
            find: jest.fn(),
            create: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    model = module.get<Model<User>>(getModelToken('User'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all users', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(usersArray),
    } as any);
    const users = await service.getUsers();
    expect(users).toEqual(usersArray);
  });

  it('should insert a new user', async () => {
    jest.spyOn(model, 'create').mockImplementationOnce(() =>
      Promise.resolve({
        userName: 'user_name',
        email: 'user@email.com',
        password: 'test123',
        fullName: 'User Name',
      } as any),
    );
    const newUser = await service.createUser({
      userName: 'user_name',
      email: 'user@email.com',
      password: 'test123',
      fullName: 'User Name',
    });
    expect(newUser).toEqual(mockUser);
  });
});
