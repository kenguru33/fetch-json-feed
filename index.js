const axios = require('axios')
const recursivelyLowercaseJSONKeys = require('recursive-lowercase-json')
const validator = require('is-my-json-valid')

/**
 * Fetch json filter response against schema.
 * @param {string} url
 * @param {*} schema
 */
const fetchJsonData = (url, schema) => {
  const filter = validator.filter({
    required: true,
    type: 'object',
    properties: schema,
    additionalProperties: false
  })

  return axios
    .get(url)
    .then(response => {
      return recursivelyLowercaseJSONKeys(response.data)
    })
    .then(data => {
      return data.map(obj => {
        return filter(obj)
      })
    })
}

module.exports = fetchJsonData
