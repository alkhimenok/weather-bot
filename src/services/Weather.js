const Api = require('./Api')
const { WEATHER_API } = process.env

class Weather extends Api {
  constructor() {
    super({ baseURL: WEATHER_API, prefix: 'weather/' })
  }
}

module.exports = Weather
