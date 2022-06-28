const { t } = require('../utils')
const COMMANDS = require('../constants/commands')

class Commands {
  constructor(bot) {
    this.bot = bot

    this.initCommands = this.initCommands.bind(this)
  }

  initCommands() {
    const commandList = Object.keys(COMMANDS)

    this.bot.setMyCommands(commandList.map(this._getCommandBody))
  }

  _getCommandBody(command) {
    return { command: COMMANDS[command], description: t(`commands.${command}`) }
  }
}

module.exports = Commands
