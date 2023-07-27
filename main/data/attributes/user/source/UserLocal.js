module.exports.createUser = createUser;
module.exports.clearStorage = clearStorage;
module.exports.getInfoStorage = getInfoStorage;
module.exports.setLocalItem = setLocalItem;


/**
 * Creates an user in the local storage and save information of this
 * @param {string} key - key/value to save in LocalStorage
 * @param {user} user - user logged
 * @returns { boolean } if user has created
 */
function createUser(key,user) {
  try {
    my.setStorageSync({
      key: key,
      data: {
        first_name: user.response.usuario.nombre,
        last_name: user.response.usuario.apellido,
        email: user.response.usuario.UserProfileID,
        documentNumber: user.response.usuario.DocumentNumber,
        DocumentType: user.response.usuario.DocumentType,
        accounts: [
          ...user.response.cuentas
        ]
      }
    });
    return true;
  } catch (error) {
    return false;
  }
}
/**
 * 
 * @param {*} key -  key/value obtained from localStorage
 * @param {*} data - data to be stored in local storage
 */
function setLocalItem(key, data) {
  try {
    my.setStorageSync({ key, data })
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * get information of the user saved in Local Storage
 * @param {string} key 
 * @returns { object|boolean } Data of user if key exists
 */
function getInfoStorage(key) {
 try {
   const {data} = my.getStorageSync({ key })
   return data
 } catch (error) {
   return false;
 }
}

/**
 * Clean the local storage
 * @returns { boolean } if local storage is cleaned returns true
 */
function clearStorage(){
  try{
    my.clearStorageSync()
    return true;
  }catch(error) {
    return false
  }
}