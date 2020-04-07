import { Command, CommandRequest, ArgDef, ArgType } from 'quro'

export class TileCommand extends Command {
  name = 'tile'

  aliases = []

  description = 'Tilize argument text.'

  useFirstArgValue = true

  argDefs = {
    text: new ArgDef({
      name: 'text',
      type: ArgType.String,
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
  onHandle(request: CommandRequest) {
    const args = this.getArgs(request)
    const text = args.text

    console.log(text)

    const result = text
      .toString()
      .split('')
      .map((char) => {
        if (char >= '0' && char <= '9') {
          return this.numberToEmoji(
            char as keyof TileCommand['numberEmojiTable']
          )
        } else {
          return this.alphabetToEmoji(char)
        }
      })
      .join('')

    return this.reply(result)
  }

  /**
   * Convert a alphabet to emoji.
   *
   * @param alphabet
   */
  alphabetToEmoji(alphabet: string) {
    return `:regional_indicator_${alphabet.toLowerCase()}:`
  }

  /**
   * Convert a number to emoji.
   *
   * @param string
   */
  numberToEmoji(number: keyof TileCommand['numberEmojiTable']) {
    return this.numberEmojiTable[number]
  }

  /**
   * Returns parsed arguments.
   *
   * @param request
   */
  getArgs(request: CommandRequest) {
    return this.parseArgs<TileCommand>(request)
  }
}

export const tile = new TileCommand()
