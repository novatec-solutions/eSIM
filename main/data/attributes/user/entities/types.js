

/**
 * @typedef {Object} user         - User data
 * @prop {string} usuario         - username
 * @prop {string} email           - user email
 * @prop {account[]} cuentas      - list of Accounts
 */

 /**
  * @typedef {Object} device - Information about device
  * @prop {string} imei - device imei
  * @prop {string} marca - device brand
  * @prop {string} modelo - device model
  */



//  name: dataHeaders.updatedName,
//  msisdn: dataHeaders.alias

/**
  * @typedef {Object} dataHeaders  - User information required to make a request
  * @prop {string} token - Access token required to make the request
  * @prop {'1' | '2' | '3' } LineOfBusiness - Account segment of the user: '1': Hogar, '2': Prepago, '3': Postpago
  * @prop {string} AccountId - User's account number. For the home segment it would be the service account number, for the prepaid and postpaid segments it would be the corresponding cell phone number. 
  * @prop {string} [email] - User's email
  * @prop {string} DocumentType - Type of document to make the query, usually the value is 1, corresponds to the identification card.
  * @prop {string} documentNumber - User's ID card number
  * @prop {string} [imei] - imei number of the device to be consulted
  * @prop {string} [updatedAddress] - New user address to be updated.
  * @prop {string} [updatedDepartment] - New user department(Provice) to be updated.
  * @prop {string} [updatedCity] - New user city to be updated.
  * @prop {string} [updatedPhone] - New user phoneNumber to be updated.
  * @prop {string} [updatedName] - User name updated.
  * @prop {string} alias - Account number used in certain transactions, is equivalent to lineOfBussiness
 */



module.exports = {}

