# test-socket-indoor-location-emitter
Node.js test server to emulate an Indoor Location Emitter

## Install

Node.js is required

## Use

- Clone repo
- run `cd path/to/project/test-socket-indoor-location-emitter`
- run `npm i`
- run `node app.js`

Configure port with `PORT` node env. Default is `3003`

Send user id at socket connection start with `userId` query params.    
You can configure bbox and floorbox in config or as socket connection in query params:
- `bbox` as [min longitude, min latitude, max longitude, max latitude]
- `floorbox` as [min floor, max floor]

To simulate not existing user id, leave it blank or set it to `unknown`. In this case, `socket error` event will be sended and connection will be closed    
