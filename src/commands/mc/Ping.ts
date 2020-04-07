import { Command, CommandRequest, ArgDef, ArgType } from 'quro'
import { MinecraftPing } from '../../MinecraftPing'

export class McPingCommand extends Command {
  name = 'mc:ping'

  aliases = []

  description = 'Returns server status.'

  argDefs = {
    host: new ArgDef({
      type: ArgType.String,
      name: 'host',
    }),
  }

  /**
   * Call on handle.
   *
   * @param request
   */
  async onHandle(request: CommandRequest) {
    const args = this.getArgs(request)
    const ping = new MinecraftPing(args.host)
    const data = await ping.ping()

    const embed = this.embed()
      .setTitle('Minecraft Server Ping.')
      .setDescription(`${args.host}'s result.`)
      .addField('Online', this.inlineCode(data.online.toString()))

    if (data.online) {
      embed
        .addField('Version', this.inlineCode(data.version))
        .addField('Description', data.description)
        .addField('Current players count', data.currentPlayers)
        .addField('Max players count', data.maxPlayers)
    }

    return this.reply({
      embed,
    })
  }

  /**
   * Returns parsed arguments.
   *
   * @param request
   */
  getArgs(request: CommandRequest) {
    return this.parseArgs<McPingCommand>(request)
  }
}

export const mcPing = new McPingCommand()
