const axios = require('axios').default
const colors = require('colors')

class Api {
  constructor({ baseURL, prefix }) {
    this.axios = axios.create({ baseURL, headers: { 'Content-Type': 'application/json' } })

    this.prefix = prefix

    this.get = this.get.bind(this)
    this.post = this.post.bind(this)
    this.put = this.put.bind(this)
    this.patch = this.patch.bind(this)
    this.delete = this.delete.bind(this)
  }

  get(...params) {
    const type = 'get'

    return this._abstractMethod(type, ...params)
  }

  post(...params) {
    const type = 'post'

    return this._abstractMethod(type, ...params)
  }

  put(...params) {
    const type = 'put'

    return this._abstractMethod(type, ...params)
  }

  patch(...params) {
    const type = 'patch'

    return this._abstractMethod(type, ...params)
  }

  delete(...params) {
    const type = 'delete'

    return this._abstractMethod(type, ...params)
  }

  _abstractMethod(type, url, params, options) {
    const start = Date.now()

    console.log('----- START -----'.blue.bgBrightWhite.bold)
    console.log(`[${type.toUpperCase()}] - ${this.prefix}${url}`.green.bgBrightWhite.bold)
    console.log(`[BODY] - ${JSON.stringify(params)}`.green.bgBrightWhite.bold)

    return this.axios[type](url, params, options)
      .then((data) => Promise.resolve(data))
      .catch((e) => console.log(`[ERROR] - ${e.response.data.error}`.red.bgBrightWhite.bold))
      .finally(() => console.log(`----- ${Date.now() - start} -----`.blue.bgBrightWhite.bold))
  }
}

module.exports = Api
