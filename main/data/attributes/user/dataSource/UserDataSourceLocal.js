const userLocal = require('../source/UserLocal');
const key = require('../../../config/local/Keys');

/**
 * Creates a new DataSourceLocal, this class interacts with the methods that access information from the device, localStorage or sessionStorage. 
 * @class
 */
class UserDataSourceLocal {
  static instance;
  constructor () {
    if (UserDataSourceLocal.instance) {
      return UserDataSourceLocal.instance
    } else {
        UserDataSourceLocal.instance = this
    }
  }
  queryUserByUsername(username) {
    return userLocal.queryUserByUsername(key.TYPE.USER,username)
  }
  
  /**
   * Creates a user with its respective information in the localStorage
   * @param {string} user 
   */
  createUser(user){
    return userLocal.createUser(key.TYPE.USER,user);
  }

  /**
   * Gets information from a user in the previously created localStorage
   * @param {string} key 
   */
  getInfoStorage(key){
    return userLocal.getInfoStorage(key);
  }

  /**
   * Selects the from line or user segment and obtains its informatio
   * @param {string} data 
   */
  setLocalLine(data){
    return userLocal.setLocalItem('LINE_SELECT', data);
  }

  /**
   * Clean de localStorage information
   */
  clearStorage() {
    return userLocal.clearStorage();
  }
}


module.exports = UserDataSourceLocal;