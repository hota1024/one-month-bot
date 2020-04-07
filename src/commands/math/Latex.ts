import { Command, CommandRequest, ArgDef, ArgType } from 'quro'
import * as mjAPI from 'mathjax-node'
import * as svg2png from 'svg2png'

mjAPI.start()

export class MathLatexCommand extends Command {
  name = 'math:latex'

  aliases = ['lat', 'latex']

  description = 'Show latex image.'

  useFirstArgValue = true

  argDefs = {
    latex: new ArgDef({
      name: 'latex',
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
    request.message.react('682941201044733966')

    const data = await mjAPI.typeset({
      math: args.latex,
      format: 'TeX',
      svg: true,
    })
    const buffer = await svg2png(data.svg, {
      width: 256 * 4,
      height: 128 * 4,
    })

    request.message.reactions.removeAll()

    return this.reply('', {
      files: [buffer],
    })
  }

  /**
   * Returns parsed arguments.
   *
   * @param request
   */
  getArgs(request: CommandRequest) {
    return this.parseArgs<MathLatexCommand>(request)
  }
}

export const mathLatex = new MathLatexCommand()
