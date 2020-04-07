import { CommandRequest, ArgDef, ArgType } from 'quro'
import { AudioCommand } from './AudioCommand'

export class AudioVolumeCommand extends AudioCommand {
  name = 'audio:volume'

  aliases = ['volume']

  description = 'Set volume.'

  argDefs = {
    volume: new ArgDef({
      name: 'volume',
      type: ArgType.Number,
      description: '0-100 volume value.',
      defaultValue: -1,
    }),
  }

  /**
   * Call on handle.
   *
   * @param request
   */
  onHandle(request: CommandRequest) {
    const args = this.getArgs(request)

    const voiceChannel = request.member.voice.channel

    if (!voiceChannel) {
      return this.reply('You need to join a voice channel first.')
    }

    const connection = this.getChannelConnection(voiceChannel)

    if (connection) {
      const dispatcher = connection.dispatcher
      if (args.volume === -1) {
        return this.send(
          `:musical_note: Current volume is ${this.inlineCode(
            (dispatcher.volume * 100).toString()
          )}.`
        )
      } else {
        connection.dispatcher.setVolume(args.volume / 100)
        return this.send(
          `:musical_note: Set volume to ${this.inlineCode(
            args.volume.toString()
          )}.`
        )
      }
    } else {
      return this.reply(`No audio playing.`)
    }
  }

  /**
   * Returns parsed arguments.
   *
   * @param request
   */
  getArgs(request: CommandRequest) {
    return this.parseArgs<AudioVolumeCommand>(request)
  }
}

export const audioVolume = new AudioVolumeCommand()
