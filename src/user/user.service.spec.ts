import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { randomUUID } from 'crypto';

const fakeDate = new Date();

const fakeUsers = [
  {
    id: 'a user id',
    userName: 'user_name',
    email: 'user@email.com',
    password: 'test123',
    fullName: 'User Name',
    createdAt: fakeDate,
    updatedAt: fakeDate
  },
  {
    id: 'a user two id',
    userName: 'user_name_two',
    email: 'user_two@email.com',
    password: 'test312',
    fullName: 'User Name Two',
    createdAt: fakeDate,
    updatedAt: fakeDate
  },
  {
    id: 'a user three id',
    userName: 'user_name_three',
    email: 'user_three@email.com',
    password: 'test321',
    fullName: 'User Name Three',
    createdAt: fakeDate,
    updatedAt: fakeDate
  },
];

const prismaMock = {
  user: {
    create: jest.fn().mockReturnValue(fakeUsers[0]),
    findMany: jest.fn().mockResolvedValue(fakeUsers),
    findFirst: jest.fn().mockResolvedValue(fakeUsers[0]),
    update: jest.fn().mockResolvedValue(fakeUsers[0]),
    delete: jest.fn(),
  },
};

describe('UserService', () => {
  let service: UserService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getUsers', () => {
    it(`should return an array of users`, async () => {
      const response = await service.getUsers();

      expect(response).toEqual(fakeUsers);
      expect(prisma.user.findMany).toHaveBeenCalledTimes(1);
      expect(prisma.user.findMany).toHaveBeenCalledWith();
    });
  });

  describe('getUser', () => {
    it(`should return a single user`, async () => {
      const response = await service.getUser(fakeUsers[0].id);

      expect(response).toEqual(fakeUsers[0]);
      expect(prisma.user.findFirst).toHaveBeenCalledTimes(1);
      expect(prisma.user.findFirst).toHaveBeenCalledWith({
        where: { id: fakeUsers[0].id },
      });
    });

    it(`should return nothing when user is not found`, async () => {
      jest.spyOn(prisma.user, 'findFirst').mockResolvedValue(undefined);

      const randomId = randomUUID();
      const response = await service.getUser(randomId);

      expect(response).toBeNull();
      expect(prisma.user.findFirst).toHaveBeenCalledTimes(1);
      expect(prisma.user.findFirst).toHaveBeenCalledWith({
        where: { id: randomId },
      });
    });
  });

  describe('createUser', () => {
    it(`should create a new user`, async () => {
      const userInput = {
        userName: fakeUsers[0].userName,
        email: fakeUsers[0].email,
        password: fakeUsers[0].password,
        fullName: fakeUsers[0].fullName
      };

      const response = await service.createUser(userInput);

      expect(response).toStrictEqual(fakeUsers[0]);
      expect(prisma.user.create).toHaveBeenCalledTimes(1);
      expect(prisma.user.create).toHaveBeenCalledWith({
        data: userInput,
      });
    });
  });

  describe('updateUser', () => {
    it(`should update a user`, async () => {
      const userUpdateData = {
        userName: fakeUsers[0].userName,
        email: fakeUsers[0].email,
        password: fakeUsers[0].password,
        fullName: fakeUsers[0].fullName,
      };

      const response = await service.updateUser(fakeUsers[0].id, userUpdateData.userName, userUpdateData.email, userUpdateData.password, userUpdateData.fullName);

      expect(response).toEqual(fakeUsers[0]);
      expect(prisma.user.update).toHaveBeenCalledTimes(1);
      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: fakeUsers[0].id },
        data: {
          ...userUpdateData,
          updatedAt: expect.any(Date),
        },
      });
    });

    it(`should return NotFoundException when no user is found`, async () => {
      const notFoundUser = {
        id: 'random user id',
        userName: 'user_random_name',
        email: 'user_random_email@email.com',
        password: 'test312',
        fullName: 'User Name Random'
      };

      jest.spyOn(prisma.user, 'update').mockRejectedValue(new Error());

      try {
        await service.updateUser(notFoundUser.id, notFoundUser.userName, notFoundUser.email, notFoundUser.password, notFoundUser.fullName);
      } catch (error) {
        expect(error).toEqual(new NotFoundException());
      }

      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: notFoundUser.id },
        data: {
          ...notFoundUser,
          updatedAt: expect.any(Date),
        },
      });
    });
  });

  describe('deleteUser', () => {
    it(`should delete user and return empty body`, async () => {
      expect(await service.deleteUser(fakeUsers[0].id)).toBeUndefined();
      expect(prisma.user.delete).toHaveBeenCalledTimes(1);
      expect(prisma.user.delete).toHaveBeenCalledWith({ where: { id: fakeUsers[0].id } });
    });

    it(`should return Error if user does not exist`, async () => {
      jest.spyOn(prisma.user, 'delete').mockRejectedValue(new Error());

      const randomId = randomUUID();
      try {
        await service.deleteUser(randomId);
      } catch (error) {
        expect(error).toEqual(new Error());
      }

      expect(prisma.user.delete).toHaveBeenCalledTimes(1);
      expect(prisma.user.delete).toHaveBeenCalledWith({
        where: { id: randomId },
      });
    });
  });
});
