import { Test } from '@nestjs/testing';
import { UserController } from 'src/user/user.controller';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';

describe('UserController', () => {
  let usersController: UserController;
  let usersService: UserService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
        controllers: [UserController],
        providers: [UserService],
      }).compile();

    usersService = moduleRef.get<UserService>(UserService);
    usersController = moduleRef.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  describe('getUsers', () => {
    it('should return an array of users', async () => {
      const newUser = User.new({userName: 'user_name', email: 'user.name@newemail.com', password: 'new.password123', fullName: 'New User'});
      const result = [newUser];
      jest.spyOn(usersService, 'getUsers').mockImplementation(() => result);

      expect(await usersController.getUsers()).toBe(result);
    });
  });
});