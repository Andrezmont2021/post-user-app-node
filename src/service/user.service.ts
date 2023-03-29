import { User } from '../db/models/user.model';
import { ResponseUser, UserObject } from '../utils/POJO/user';
import { UserLoginObject } from '../utils/POJO/user-login';
import { CustomError } from '../utils/custom-error.model';

export const registerUser = async (
  data: UserObject
): Promise<ResponseUser> => {
  try {
    const result = await User.create(data);
    return {
      isOk: true,
      message: 'User registered successfully',
      data: result.dataValues,
    };
  } catch (error: any) {
    throw new CustomError(
      'Error when try to create an user',
      500,
      error?.original?.sqlMessage || error.message
    );
  }
};

export const login = async (data: UserLoginObject): Promise<ResponseUser> => {
  try {
    const result = await User.findOne({ where: { email: data.email } });
    if (!result) {
      return {
        isOk: false,
        message: 'User not found',
      };
    }
    if (validatePassword(result, data.password)) {
      return {
        isOk: true,
        message: 'User login successfully',
      };
    } else {
      return {
        isOk: false,
        message: 'Invalid password',
      };
    }
  } catch (error: any) {
    throw new CustomError(
      'Error when try to search user by email (login)',
      500,
      error?.original?.sqlMessage || error.message
    );
  }
};

export const validatePassword = (user: User, password: string): boolean => {
  return user.dataValues.password.toLowerCase() === password.toLowerCase();
};
