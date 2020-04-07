import { Command, CommandRequest, PipeNext } from 'quro'

export class PingCommand extends Command {
  name = 'ping'

  aliases = []

  description = 'Measure ping.'

  argDefs = {}

  /**
   * Call on handle.
   *
   * @param request
   */
  onHandle(request: CommandRequest) {
    const now = Date.now()
    request.message.reply(
      this.embed()
        .setTitle('Ping')
        .addField(
          'Ping',
          this.inlineCode(
            (now - request.message.createdAt.getTime()).toString()
          ) + 'ms'
        )
    )
  }

  /**
   * Call on pipe.
   *
   * @param request
   * @param next
   */
  onPipe(request: CommandRequest, next: PipeNext) {
    const now = Date.now()
    return next.setAppendArgs([now - request.message.createdAt.getTime()])
  }

  /**
   * Returns parsed arguments.
   *
   * @param request
   */
  getArgs(request: CommandRequest) {
    return this.parseArgs<PingCommand>(request)
  }
}

export const ping = new PingCommand()
