/**
 * @module domain/utils
 */

/**
  @function validEmail
  @description Validates email format
  @param {string} value value to validate
*/
function validEmail(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

module.exports.validEmail = validEmail