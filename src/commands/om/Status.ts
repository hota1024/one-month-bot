import { Command, CommandRequest } from 'quro'
import { MinecraftPing } from '../../MinecraftPing'

export class OmStatusCommand extends Command {
  name = 'om:status'

  aliases = []

  description = 'Show OneMonth Minecraft Server status.'

  argDefs = {}

  readonly ping: MinecraftPing = new MinecraftPing('153.127.29.105')

  /**
   * Call on handle.
   */
  async onHandle() {
    const data = await this.ping.ping()

    const embed = this.embed()
      .setTitle('OneMonth Server Status')
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
    return this.parseArgs<OmStatusCommand>(request)
  }
}

export const omStatus = new OmStatusCommand()
