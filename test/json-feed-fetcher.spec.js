const axios = require('axios')
const fetchJsonData = require('../index')
const expect = require('chai').expect
const sinon = require('sinon')

const response = {}
response.data = [
  {
    MMSI: '257780800',
    Ship_name: 'BAAT LEVANGER',
    Latitude: "63° 45.0321'",
    Longitude: "011° 17.8885'",
    Decimal_Latitude: '63.750535',
    Decimal_Longitude: '11.298141666666666',
    Time_stamp: '2017-11-28T19:41:24.000Z',
    SOG: '.0',
    COG: '260',
    nested: {
      id: '1',
      name: 'nested'
    }
  },
  {
    MMSI: '259193000',
    Ship_name: 'DET NORSKE VERITAS',
    Destination: '+47 91679625',
    Latitude: "68° 04.2567'",
    Longitude: "013° 32.3029'",
    Decimal_Latitude: '68.070945',
    Decimal_Longitude: '13.538381666666666',
    Time_stamp: '2017-11-28T19:50:08.000Z',
    SOG: '.0',
    COG: '159'
  }
]

describe('fetchJsonData array response', () => {
  let stub
  beforeEach(() => {
    stub = sinon.stub(axios, 'get').resolves(response)
  })
  afterEach(() => {
    stub.restore()
  })

  it('should convert json keys to lowercase', () => {
    return fetchJsonData('http://dummyurl', {
      mmsi: { type: 'string', required: true }
    }).then(data => {
      expect(Object.keys(data[0])[0]).to.equal('mmsi')
    })
  })
  it('should return array of objects as is in lowercase if schema is not specified', () => {
    return fetchJsonData('http://dummyurl').then(data => {
      expect(data[0]).to.deep.equal({
        mmsi: '257780800',
        ship_name: 'BAAT LEVANGER',
        latitude: "63° 45.0321'",
        longitude: "011° 17.8885'",
        decimal_latitude: '63.750535',
        decimal_longitude: '11.298141666666666',
        time_stamp: '2017-11-28T19:41:24.000Z',
        sog: '.0',
        cog: '260',
        nested: {
          id: '1',
          name: 'nested'
        }
      })
    })
  })
  it('should return array of object filtered against schema', () => {
    const schema = {
      required: true,
      type: 'object',
      properties: {
        mmsi: { type: 'string', required: true },
        ship_name: { type: 'string', required: true }
      },
      additionalProperties: false
    }
    return fetchJsonData('http://dummyurl', schema).then(data => {
      expect(data).to.deep.equal([
        {
          mmsi: '257780800',
          ship_name: 'BAAT LEVANGER'
        },
        {
          mmsi: '259193000',
          ship_name: 'DET NORSKE VERITAS'
        }
      ])
    })
  })
})

describe('fetchJsonData single object response', () => {
  let stub
  beforeEach(() => {
    stub = sinon.stub(axios, 'get').resolves({data: {mmsi: '123456789', something: 'stuff'}})
  })
  afterEach(() => {
    stub.restore()
  })
  it('should return single object filtered against schema', () => {
    const schema = {
      required: true,
      type: 'object',
      properties: {
        mmsi: { type: 'string', required: true }
      },
      additionalProperties: false
    }
    return fetchJsonData('http://dummyurl', schema).then(data => {
      expect(data).to.deep.equal(
        {
          mmsi: '123456789'
        }
      )
    })
  })
})
