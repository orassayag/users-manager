import CustomError from '../../custom/error.custom.js';
import DataUtils from '../../utils/data.utils.js';
import UserSchema from './user.schema.js';

export default class UserHelpers {
  constructor() {
    throw new CustomError({ message: 'Cannot create an instance of a static class' });
  }

  /**
   * Set User.
   *
   * Set the current user fields according to the field paths of the schema vs the 3
   * party field path.
   * @param user - The user to set.
   * @return {object}
   */
  static setUser(user) {
    const newUser = {};
    UserSchema.userFields.forEach((e) => {
      newUser[e.field] = e.fieldPath ? e.fieldPath.split('.').reduce((prev, cur) => prev && prev[cur], user) : user[e.field];
    });
    if (!newUser.id) {
      newUser.id = DataUtils.generateId(10);
    }
    return newUser;
  }
}
