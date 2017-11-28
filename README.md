## JSON FEED FETCHER

Fetch json data from an endpoint and returns an array of objects filtered
against scheme

### Install:

````npm install json-feed-fetcher
### run test:
``` npm test

### Example code:

```javascript
const jsonDataFetch = require('json-feed-fetcher')

const schema = {
  name: { type: 'string', required: true }
}

jsonDataFetch('http://myendpoint', schema).then(data => {
  console.log(data)
})
````
