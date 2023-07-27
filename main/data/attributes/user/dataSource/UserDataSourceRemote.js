const userRemote = require('../source/UserRemote');
const api = require('../../../config/remote/APIs');

/**
 * Import the types required by the documentation
 */
const {dataHeaders} = require('../entities/types')

/**
 * Creates a new DataSourceRemote, this class uses methods found in userRemote
 * @class [UserDataSourceRemote, UserDataSourceRemote] 
 */
class UserDataSourceRemote {
  static instance;
  constructor () {
    if (UserDataSourceRemote.instance) {
      return UserDataSourceRemote.instance
    } else {
        UserDataSourceRemote.instance = this
    }
  }
  /**
   * 
   * @param {string} email - User's email to be autenticated
   * @param {string} password - User's password
   */
  loginUser(email, password){
    return userRemote.loginUser(api.URL_BASE.CLARO_LOGIN, email, password)
  }

  getInformationLine(data){
    return userRemote.getInformationLine(api.URL_BASE.CLARO_LOGIN, data)
  }

}

module.exports = UserDataSourceRemote