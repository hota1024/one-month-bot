import { CommandRequest, ArgDef, ArgType, PipeNext } from 'quro'
import { YouTubeCommand } from './YoutubeCommand'

export class YoutubePickCommand extends YouTubeCommand {
  name = 'youtube:pick'

  aliases = ['yt:pick']

  description = 'Pick search result.'

  argDefs = {
    index: new ArgDef({
      name: 'index',
      type: ArgType.Number,
      description: 'Pick index.',
    }),
  }

  /**
   * Call on handle.
   *
   * @param request
   */
  onHandle(request: CommandRequest) {
    const args = this.getArgs(request)

    if (!this.hasPick(request.author)) {
      return this.reply(
        `You has not search reuslt. You need execute ${this.inlineCode(
          'youtube:search <query>'
        )} command.`
      )
    }

    const pick = this.getPick(request.author)

    return this.reply(pick[args.index].snippet.title)
  }

  onPipe(request: CommandRequest, next: PipeNext) {
    const args = this.getArgs(request)

    if (!this.hasPick(request.author)) {
      request.message.reply(
        `You has not search reuslt. You need execute ${this.inlineCode(
          'youtube:search <query>'
        )} command.`
      )
    }

    const pick = this.getPick(request.author)

    if (args.index < pick.length) {
      return next.setAppendArgs([
        `https://www.youtube.com/watch?v=${pick[args.index].id.videoId}`,
      ])
    }
    return next.setAppendArgs([''])
  }

  /**
   * Returns parsed arguments.
   *
   * @param request
   */
  getArgs(request: CommandRequest) {
    return this.parseArgs<YoutubePickCommand>(request)
  }
}

export const youtubePick = new YoutubePickCommand()
