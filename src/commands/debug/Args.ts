import { Command, CommandRequest } from 'quro'

export class DebugArgsCommand extends Command {
  name = 'debug:args'

  aliases = []

  description = 'Returns passed arguments.'

  argDefs = {}

  /**
   * Call on handle.
   *
   * @param request
   */
  onHandle(request: CommandRequest) {
    return this.reply('\n' + request.args.map((arg) => `\`${arg}\``).join('\n'))
  }
}

export const debugArgs = new DebugArgsCommand()
