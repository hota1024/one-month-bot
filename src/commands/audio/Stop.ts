import { CommandRequest } from 'quro'
import { AudioCommand } from './AudioCommand'
import { audioStore } from './store'

export class AudioStopCommand extends AudioCommand {
  name = 'audio:stop'

  aliases = ['stop']

  description = 'Stop audio and leave from voice channel.'

  argDefs = {}

  /**
   * Call on handle.
   *
   * @param request
   */
  onHandle(request: CommandRequest) {
    const voiceChannel = request.member.voice.channel

    if (!voiceChannel) {
      return this.reply('You need to join a voice channel first.')
    }

    const connection = this.getChannelConnection(voiceChannel)

    connection.disconnect()

    audioStore.connections = audioStore.connections.filter(
      (c) => c !== connection
    )

    return this.reply(':door: See you next time!')
  }

  /**
   * Returns parsed arguments.
   *
   * @param request
   */
  getArgs(request: CommandRequest) {
    return this.parseArgs<AudioStopCommand>(request)
  }
}

export const audioStop = new AudioStopCommand()
