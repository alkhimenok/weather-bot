const commandTypes = require('./constants/commandTypes')
const { t } = require('./utils/lang')

class Commands {
  constructor(bot) {
    this.bot = bot

    this.initCommands = this.initCommands.bind(this)
  }

  initCommands() {
    const commandList = Object.keys(commandTypes)

    this.bot.setMyCommands(commandList.map(this._getCommandBody))
  }

  _getCommandBody(command) {
    return { command: commandTypes[command], description: t(`commands.${command}`) }
  }
}

module.exports = Commands
