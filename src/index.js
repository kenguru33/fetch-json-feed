const axios = require('axios')
const recursivelyLowercaseJSONKeys = require('recursive-lowercase-json')
const validator = require('is-my-json-valid')

/**
 * Fetch json feed from an url. Convert all object keys to lowercase.
 * Filter and validate against schema.
 * @param {string} url
 * @param {*} schema
 * @returns {PromiseLike<Object>}
 */
const fetchJsonData = (url, schema = {}) => {
  const filter = validator.filter(schema)
  return axios
    .get(url)
    .then(response => {
      return recursivelyLowercaseJSONKeys(response.data)
    })
    .then(data => {
      if (!Array.isArray(data)) {
        console.log(data)
        return filter(data)
      }
      return data.map(data => {
        return filter(data)
      })
    })
}

module.exports = fetchJsonData
