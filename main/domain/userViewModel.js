const UserRepository = require('../data/attributes/user/repository/UserRepository');

/**
 * Import types required by documentation
 */
const {dataHeaders} = require('../data/attributes/user/entities/types')

/**
 * @module domain/userViewModel
 */


 /**
 * @typedef {Object} Account
 * @property {string} LineOfBusiness - Business line
 * @property {string} AccountId - Phone number
 * @property {string} alias - Account nickname
 * @property {string} token - It is required to bring the information
 * @property {string} email - the year it came to life
 * @property {string} codigo 
 * @property {string} descripcion
 * @property {string} imei
 * @property {string} marca
 * @property {string} modelo
 */


 
/**
 * @function signUp
 * @param {string} email
 * @param {string} password
 * @returns {Object}
*/
async function signUp(email, password) {
  const userRepository = new UserRepository();
  const queryUserRemote = await userRepository.loginUserRemote(email, password);
  if(queryUserRemote.data.error === 0) {
    const {cuentas} = queryUserRemote.data.response;
    /** Se registra el usuario en local */
    if(cuentas.length > 0) {
      if(userRepository.createUserLocal(queryUserRemote.data)) {
        return { error: 0 }
      } else {
        return { error: 1, response: 'Error guardando los datos del usuario en el storage' }
      }
    } else {
      return {error: 1, response: 'No tienes una cuentas asociadas'};
    }
  } else {
    return {error: 1, response: queryUserRemote.data.response};
  }
  
}

/**
 * @function getLineSelect
 * @description Brings from localstorage the data of the selected line
 * @returns {Object | null} If is nothing found, it returns null.
*/
function getLineSelect() {
  const userRepository = new UserRepository();
  const lineData = userRepository.getInfoStorage('LINE_SELECT');
  if(lineData) {
    return lineData
  } else {
    return null
  }
}

/**
 * @function getUserLogged
 * @description Brings from localstorage the data of the user
 * @returns {Object | null} If is nothing found, it returns null.
*/
function getUserLogged() {
  const userRepository = new UserRepository();
  const userData = userRepository.getInfoStorage('REGISTERED_USER');
  if(userData) {
    return userData
  } else {
    return null
  }
}

/**
 * @function setLocalLine
 * @description Set a user account to localstorage
 * @param {Account} data selected user account
 * @returns {Boolean} true or false if could be enter
*/
function setLocalLine(data) {
  const userRepository = new UserRepository();
  return userRepository.setLocalLine(data);
}

/**
 * @function startClearStorage
 * @description Clean up the localstorage
 * @returns {Boolean} true or false if could be cleaned
*/
function startClearStorage(){
  const userRepository = new UserRepository();
  const clearLocalStorage = userRepository.clearStorage();
  return clearLocalStorage;
}

/**
 * @function getInformationLine
 * @description Gets the information of the selected account (imei, brand, model)
 * @param {Account} data selected user account
 * @returns {Object} selected user account
*/
async function getInformationLine(data) {
  const userRepository = new UserRepository();
  const infoLine = await userRepository.getInformationLine(data);
  if (infoLine.status === 200) {
    if(infoLine.data.error === 0) {
      if(infoLine.data.response[0].descripcion === 'Parametros incompletos.') {
        throw new Error('Error consultando el servicio, parametros incompletos')
      } else {
        return infoLine.data
      }
    } else {
      throw new Error('Error consultando el servicio, error de validación')
    }
  } else {
    throw new Error('Error consultando el servicio')
  }
}


module.exports.setLocalLine = setLocalLine;
module.exports.signUp = signUp;
module.exports.startClearStorage = startClearStorage;
module.exports.getUserLogged = getUserLogged;
module.exports.getInformationLine = getInformationLine;
module.exports.getLineSelect = getLineSelect;
