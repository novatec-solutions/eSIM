/**
 * @module domain/utils
 */

/**
  @function hasValue
  @description Validates non-null values, undefined, [], {}
  @param {any} value value to validate
*/
const hasValue = (value) => {
  
  if (Array.isArray(value)) {
    return 0 < value.length
  }
  else if (typeof value === 'object' && value !== null) {
    return Object.keys(value).length > 0
  } else if (typeof value === 'string')  return value !== ''
  else {
    return ['null', 'undefined', 'NaN', 'false'].indexOf(value + '') === -1
  } 

}

module.exports = hasValue
