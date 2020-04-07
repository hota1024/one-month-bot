import {
  Command,
  CommandRequest,
  ArgDef,
  ArgType,
  CommandInterface,
} from 'quro'

export class HelpCommand extends Command {
  name = 'help'

  aliases = []

  description = 'Show help.'

  argDefs = {
    command: new ArgDef({
      name: 'command',
      type: ArgType.String,
      description: 'Command name or alias.',
      defaultValue: '',
    }),
  }

  /**
   * Call on handle.
   *
   * @param request
   */
  onHandle(request: CommandRequest) {
    const args = this.getArgs(request)

    if (args.command) {
      return this.reply(this.commandEmbed(this.resolveCommand(args.command)))
    }

    return this.reply(this.commandListEmbed())
  }

  /**
   * Resolve command.
   *
   * @param query
   */
  private resolveCommand(query: string) {
    return this.bot.commands.find(
      (command) =>
        command.name === query ||
        command.aliases.some((alias) => alias === query)
    )
  }

  /**
   * Command embed.
   *
   * @param command
   */
  private commandEmbed(command: CommandInterface) {
    const embed = this.embed()

    embed
      .setTitle(`${this.inlineCode(command.name)} command details.`)
      .setThumbnail(this.bot.client.user.avatarURL())
      .setDescription(command.description)

    for (const [name, def] of Object.entries(command.argDefs)) {
      embed.addField(name, def.description || 'No description')
    }

    return embed
  }

  /**
   * Command list embed.
   */
  private commandListEmbed() {
    const embed = this.embed()

    embed
      .setTitle('OneMonth bot')
      .setThumbnail(this.bot.client.user.avatarURL())
      .setDescription('OneMonth utility bot.')
      .setFooter('This bot created by @hota1024')

    for (const command of this.bot.commands) {
      embed.addField(
        command.name,
        command.description || 'No description',
        true
      )
    }

    return embed
  }

  /**
   * Returns parsed arguments.
   *
   * @param request
   */
  getArgs(request: CommandRequest) {
    return this.parseArgs<HelpCommand>(request)
  }
}

export const help = new HelpCommand()
