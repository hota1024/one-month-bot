import { CommandRequest, ArgDef, ArgType } from 'quro'
import { YouTubeCommand } from './YouTubeCommand'

export class YoutubeSearchCommand extends YouTubeCommand {
  name = 'youtube:search'

  aliases = ['yt:search']

  description = 'Search youtube movie.'

  useFirstArgValue = true

  argDefs = {
    query: new ArgDef({
      name: 'query',
      type: ArgType.String,
      description: 'Search query.',
    }),
  }

  numberEmojiTable = {
    '0': ':zero:',
    '1': ':one:',
    '2': ':two:',
    '3': ':three:',
    '4': ':four:',
    '5': ':five:',
    '6': ':six:',
    '7': ':seven:',
    '8': ':eight:',
    '9': ':nine:',
  }

  /**
   * Call on handle.
   *
   * @param request
   */
  async onHandle(request: CommandRequest) {
    const args = this.getArgs(request)

    const movies = await this.searchMovie(args.query)

    const embed = this.embed().setTitle(
      '<:youtube:696993992222441473> Search reuslt.'
    )

    const picks = []
    let index = 0
    for (const movie of movies) {
      picks.push(
        this.numberToEmoji(
          index.toString() as keyof YoutubeSearchCommand['numberEmojiTable']
        ) +
          ' ' +
          movie.snippet.title
      )
      ++index
    }
    embed.setDescription(picks.join('\n\n'))

    this.setPick(request.author, movies)

    return this.reply({ embed })
  }

  /**
   * Convert a number to emoji.
   *
   * @param string
   */
  numberToEmoji(number: keyof YoutubeSearchCommand['numberEmojiTable']) {
    return this.numberEmojiTable[number]
  }

  /**
   * Returns parsed arguments.
   *
   * @param request
   */
  getArgs(request: CommandRequest) {
    return this.parseArgs<YoutubeSearchCommand>(request)
  }
}

export const youtubeSearch = new YoutubeSearchCommand()
