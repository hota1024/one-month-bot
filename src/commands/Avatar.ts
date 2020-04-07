import { Command, CommandRequest, PipeNext } from 'quro'

export class AvatarCommand extends Command {
  name = 'avatar'

  aliases = []

  description = 'Show your avatar.'

  argDefs = {}

  /**
   * Call on handle.
   *
   * @param request
   */
  onHandle(request: CommandRequest) {
    // const args = this.getArgs(request)

    return this.reply({
      files: [request.author.avatarURL()],
    })
  }

  /**
   * Call on pipe.
   *
   * @param request
   * @param next
   */
  onPipe(request: CommandRequest, next: PipeNext) {
    return next.setAppendArgs([request.author.avatarURL()])
  }

  /**
   * Returns parsed arguments.
   *
   * @param request
   */
  getArgs(request: CommandRequest) {
    return this.parseArgs<AvatarCommand>(request)
  }
}

export const avatar = new AvatarCommand()
