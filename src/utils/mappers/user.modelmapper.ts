import { UserObject } from '../POJO/user';

export class UserModelMapper {
  static toDto(user: any): UserObject {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
    };
  }
}
