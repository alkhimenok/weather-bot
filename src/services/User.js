const Api = require('./Api')
const { DATABASE_API } = process.env

class User extends Api {
  constructor() {
    super({ baseURL: DATABASE_API, prefix: 'user/' })

    this.user = {
      find: (id) => this.get(`users.json?orderBy="id"&equalTo=${id}`),
      create: (data) => this.post('users.json', data),
      update: (userKey, key, value) => this.put(`users/${userKey}/${key}.json`, value),
      delete: (userKey) => this.delete(`users/${userKey}.json`)
    }

    this.findUser = this.findUser.bind(this)
    this.createUser = this.createUser.bind(this)
    this.updateUser = this.updateUser.bind(this)
    this.deleteUser = this.deleteUser.bind(this)
  }

  async findUser(id) {
    const response = await this.user.find(id)
    const [user] = Object.values(response.data)
    const [userKey] = Object.keys(response.data)

    return { user, userKey }
  }

  async createUser(data) {
    await this.user.create(data)

    return data
  }

  async updateUser(id, data) {
    const { user, userKey } = await this.findUser(id)
    const updateList = Object.entries(data)

    await Promise.all(updateList.map(([key, value]) => this.user.update(userKey, key, value)))

    return { ...user, ...data }
  }

  async deleteUser(id) {
    const response = await this.findUser(id)
    const [userKey] = Object.keys(response.data)

    await this.user.delete(userKey)
  }
}

module.exports = User
