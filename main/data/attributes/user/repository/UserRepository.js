const UserDataSourceLocal = require('../dataSource/UserDataSourceLocal');
const UserDataSourceRemote = require('../dataSource/UserDataSourceRemote');
const userDatasourceLocal = new UserDataSourceLocal();
const userDatasourceRemote = new UserDataSourceRemote();

/**
 * Import the types required by the documentation
 */
const {dataHeaders} = require('../entities/types')

/**
 * The Repository class hosts all the methods coming from the DataSourceRemote and DataSourceLocal to provide the viewModel with a single access interface, following the principles of an MVVM architecture.
 * @class
 */
class UserRepository {
  static instance;
  constructor () {
    if (UserRepository.instance) {
      return UserRepository.instance
    } else {
        UserRepository.instance = this
    }
  }
  
  /***
   * Creates a user with its respective information in the localStorage
   * @param {string} user 
   */
  createUserLocal(user) {
    return userDatasourceLocal.createUser(user);
  }

  /**
   * Clean the localStorage
   */
  clearStorage(){
    return userDatasourceLocal.clearStorage()
  }

 /**
   * Gets information from a user in the previously created localStorage
   * @param {string} key 
   */
  getInfoStorage(key){
    return userDatasourceLocal.getInfoStorage(key)
  }

  queryUserByUsernameLocal(username) {
    return userDatasourceLocal.queryUserByUsername(username);
  }

  /**
   * Login User with a user and password valid.
   * @param {string} email - User's email to be autenticated
   * @param {string} password - User's password
   */  
  loginUserRemote(email, password) {
    return userDatasourceRemote.loginUser(email, password);
  }

  getInformationLine(data) {
    return userDatasourceRemote.getInformationLine(data);
  }

  /**
   * Selects the from line or user segment and obtains its informatio
   * @param {string} data 
   */
  setLocalLine(data) {
    return userDatasourceLocal.setLocalLine(data);
  }

}


module.exports = UserRepository;