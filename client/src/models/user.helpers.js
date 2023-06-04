export default class UserHelpers {
  constructor() {
    throw new Error('Cannot create an instance of a static class');
  }

  /**
   * Get User Full Name.
   *
   * Get all the parts of the user name and return the full name of the user.
   * @param user - The user to get the full name from.
   * @return {object}
   */
  static getUserFullName(user) {
    return `${user.firstName} ${user.lastName}`;
  }

  /**
   * Set User.
   *
   * Get all the parts of the user address and return the user with the full address.
   * @param user - The user to set the full address from.
   * @return {object}
   */
  static setUser(user) {
    const newUser = { ...user };
    newUser.address = `${user.streetNumber} ${user.streetName} ${user.city} ${user.state}`;
    return newUser;
  }

  /**
   * Clear User.
   *
   * Get the user and clear all the redundant fields before sent to the server.
   * @param user - The user to clear.
   * @return {object}
   */
  static clearUser(user) {
    const updatedUser = this.setUser(user);
    ['mode', 'fullName', 'streetName', 'streetNumber', 'city', 'state'].forEach((key) => {
      delete updatedUser[key];
    });
    return updatedUser;
  }
}
