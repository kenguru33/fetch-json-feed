Fetch json data from an endpoint and returns an array of objects or a single object filtered
against scheme. All properties key name are coverted to lowercase.

### Install:

```
npm install json-feed-fetcher
```

### run test:

```
npm test
```

### Example code:

```javascript
const jsonDataFetch = require('json-feed-fetcher')

const vesselSchema = {
  required: true,
  type: 'object',
  properties: {
    mmsi: {type: 'string', required: true},
    name: {type: 'string', required: true},
    rs: {type: 'string', required: true},
    state: {type: 'string', required: true},
    email: {type: 'string', required: true},
    mobile: {type: 'string', required: true},
    station: {
      required: true,
      type: 'object',
      properties: {
        name: {type: 'string', required: true},
        region: {type: 'string', required: true}
      },
      additionalProperties: false
    }
  },
  additionalProperties: false
}


jsonDataFetch('http://myendpoint', schema).then(data => {
  console.log(data)
})
```
