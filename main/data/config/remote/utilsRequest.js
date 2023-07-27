const hasValue = require("../../../domain/utils/hasValue")

/**
 * @module data/config/remote/utilsRequest
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
 * @function getHeaders
 * @description Centralizes the header logic for all requests
 * @param {Account} headers account that we currently have selected
 * @param {Object} extraParams Additional headers
 * @returns {Object} Object with formatting parameters
*/
const getHeaders = ({email, token, AccountId, LineOfBusiness}, extraParams = {}) => {
  return {...{
    'X-SESSION-ID':token,
    'X-MC-LINE': AccountId,
    'X-MC-LOB':hasValue(LineOfBusiness) ? LineOfBusiness : '0',
    'X-MC-MAIL': email,
    'X-MC-SO': '',

    // 'X-MC-SO-V': 11,
    // 'Cache-Control': 'no-cache',
    // 'X-MC-SO-API': 30,
    // 'X-MC-SO-PHONE-F': 'samsung',
    // 'X-MC-SO-PHONE-M': 'SM-A217M',
    // 'X-MC-APP-V': '15.4.0',
    // 'X-MC-DEVICE-NAME': 'samsungSM-A217M',
    // 'X-MC-USER-AGENT':'eyJpcCI6IjE5Mi4xNjguMS40IiwidXNlckFnZW50IjoiTWlDbGFyb0FwcC8wLjAuMSAoc2Ftc3VuZzsgU00tQTIxN007IFx1MDAzY2FuZHJvaWQvMTFcdTAwM2UpIn0=',


    'X-MC-DEVICE-ID':'apaBtkizNFNBZELjASE/HxysF2nkRUJ3EefWy9UX6y9Wz/iV/sRlb3y+yK8l1FTeogBA9lcLwkVLXFOtrzjTRwp8SGQ9BWh5+G2IeRbaEOMM04ocECda0jGTWwWVjeYC8LwH23SiRUbD73nbyAnMNfunzxeYvhCs/x2s9D+1y8I='
  }, ...extraParams}
}

/**
 * @function baseRequest
 * @description Function that is responsible for retrying the request if the response has a 401 status; otherwise, it returns the correct response or the corresponding error
 * @param {Object} requestParams
 * @returns {Object | Error} Returns the response or an error
*/
const baseRequest = async ({url, body, headers, method = 'POST', dataType = 'json'}) => {

  const requestPromise = async () =>  await my.request({
    url,
    data: body,
    method,
    headers,
    dataType
  })
  
  try {
    return await requestPromise()
  } catch (error) {
    if (error.status === 401 && hasValue(headers['X-SESSION-ID'])) {
      try {
        const resRetry = await refreshToken(headers)
        if(hasValue(resRetry)) {
          // setiamos la variable en global data para que posteriormente se actualice 
          headers['X-SESSION-ID'] = resRetry
          return await requestPromise()
        } else {
          throw new Error('Fallo refrescando token')
        }
        
      } catch (error) {
        // retornamos el error acá para que la condición de status sirva para peticiones correctas o con fallos
        return error
      }

    } else {
      // retornamos el error acá para que la condición de status sirva para peticiones correctas o con fallos
      return error
    }
  }
}


/**
 * @function refreshToken
 * @description Gets a new token
 * @param {Account} headers account that we currently have selected
 * @returns {string} New token
*/
async function refreshToken(headers) {
  try {
    const res = await my.request({
      url: 'https://apiselfservice.co/api/index.php/v2/soap/AuthRefresh.json',
      method: 'POST',
      data: {
        data: null
      },
      dataType: 'json',
      headers,
    })
    if(res.data.error === 0) {
      setTokenLineSelect(res.data.response.cuenta.token)
      return res.data.response.cuenta.token
    }
    return null
  } catch (error) {
    return null
  }
}

/**
 * @function setTokenLineSelect
 * @description Set new token
 * @param {string} resRetry New token 
 * @returns {void}
*/
function setTokenLineSelect(resRetry) {
  let {data} = my.getStorageSync({ key: 'LINE_SELECT' })
  data.token = resRetry
  my.setStorageSync({ key: 'LINE_SELECT', data })
}

module.exports.baseRequest = baseRequest
module.exports.getHeaders = getHeaders
