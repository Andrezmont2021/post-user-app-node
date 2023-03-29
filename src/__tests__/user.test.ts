import { User } from '../db/models/user.model'; // User model defined
import * as userService from '../service/user.service';
import { UserModel } from './POJO/user';
import { UserObject } from '../utils/POJO/user';
import { UserLoginObject } from '../utils/POJO/user-login';

let userModelCreate: jest.SpyInstance;
let userModelFindOne: jest.SpyInstance;

let userObject: UserObject;
let userModel: UserModel;
let userEntity: UserObject;

let userLogin: UserLoginObject;

beforeAll(() => {
  // POJO
  userObject = {
    firstName: 'John',
    lastName: 'Owen',
    email: 'john@example.com',
    password: '1234',
  };
  userEntity = {
    id: 1,
    ...userObject,
  };
  userModel = {
    dataValues: {
      ...userEntity,
    },
  };

  userLogin = {
    email: 'john@example.com',
    password: '1234',
  };

  // Mocks
  userModelCreate = jest.spyOn(User, 'create');
  userModelCreate.mockImplementation(() => Promise.resolve(userModel));

  userModelFindOne = jest.spyOn(User, 'findOne');
  userModelFindOne.mockImplementation(() => Promise.resolve(userModel));
});

describe('Register a user', () => {
  test('it should create a new user', async () => {
    const res = await userService.registerUser(userObject);
    expect(res.isOk).toBe(true);
    expect(res.message).toBe('User registered successfully');
    expect(res?.data?.email).toBe('john@example.com');
    expect(userModelCreate).toHaveBeenCalledWith(userObject);
  });
});

describe('Login a user', () => {
  test('it should show user login successfully', async () => {
    const res = await userService.login(userLogin);
    expect(res.isOk).toBe(true);
    expect(res.message).toBe('User login successfully');
    expect(userModelFindOne).toHaveBeenCalledWith({
      where: { email: userLogin.email },
    });
  });
});
