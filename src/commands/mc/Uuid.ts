import { Command, CommandRequest, ArgDef, ArgType, PipeNext } from 'quro'
import axios from 'axios'

export class McUuidCommand extends Command {
  name = 'mc:uuid'

  aliases = []

  description = 'Returns your minecraft profile UUID.'

  argDefs = {
    username: new ArgDef({
      name: 'username',
      description: 'Minecraft Username',
      type: ArgType.String,
    }),
  }

  /**
   * Call on handle.
   *
   * @param request
   */
  async onHandle(request: CommandRequest) {
    const args = this.getArgs(request)

    return this.reply({
      embed: this.embed()
        .setTitle(`Minecraft user UUID`)
        .addField('Username', args.username)
        .addField('UUID', this.inlineCode(await this.getUuid(args.username))),
    })
  }

  /**
   * Call on pipe.
   *
   * @param request
   * @param next
   */
  async onPipe(request: CommandRequest, next: PipeNext) {
    const args = this.getArgs(request)
    return next.setAppendArgs([await this.getUuid(args.username)])
  }

  /**
   * Returns parsed arguments.
   *
   * @param request
   */
  getArgs(request: CommandRequest) {
    return this.parseArgs<McUuidCommand>(request)
  }

  /**
   * Get user uuid.
   *
   * @param username
   */
  private async getUuid(username: string) {
    const { data: user } = await axios.get<{
      id: string
    }>(`https://api.mojang.com/users/profiles/minecraft/${username}`)
    return user.id
  }
}

export const mcUuid = new McUuidCommand()
