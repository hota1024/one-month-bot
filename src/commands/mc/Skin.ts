import { Command, CommandRequest, ArgDef, ArgType } from 'quro'

export class McSkinCommand extends Command {
  name = 'mc:skin'

  aliases = []

  description = 'Returns minecraft skin by passed UUID.'

  argDefs = {
    uuid: new ArgDef({
      name: 'uuid',
      type: ArgType.String,
      description: 'Minecraft User UUID',
    }),
  }

  /**
   * Call on handle.
   *
   * @param request
   */
  onHandle(request: CommandRequest) {
    const args = this.getArgs(request)

    return this.reply({
      embed: this.embed()
        .setTitle('Minecraft User Skin')
        .setDescription(`${this.inlineCode(args.uuid)} skin image.`)
        .setImage(`https://crafatar.com/renders/body/${args.uuid}.png`),
    })
  }

  /**
   * Returns parsed arguments.
   *
   * @param request
   */
  getArgs(request: CommandRequest) {
    return this.parseArgs<McSkinCommand>(request)
  }
}

export const mcSkin = new McSkinCommand()
