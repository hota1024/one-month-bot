import { CommandRequest, ArgDef, ArgType } from 'quro'
import * as ytdl from 'ytdl-core'
import { audioStore } from './store'
import { AudioCommand } from './AudioCommand'

export class AudioPlayCommand extends AudioCommand {
  name = 'audio:play'

  aliases = ['play']

  description = 'Play audio from source.'

  argDefs = {
    source: new ArgDef({
      name: 'source',
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
    const voiceChannel = request.member.voice.channel

    if (!voiceChannel) {
      return this.reply('You need to join a voice channel first.')
    }

    if (this.getChannelConnection(voiceChannel)) {
      return this.reply(`There's still audio playing.`)
    }

    if (ytdl.validateURL(args.source)) {
      const connection = await voiceChannel.join()
      const info = await ytdl.getInfo(args.source)
      await request.message.channel.send(
        `<:youtube:696993992222441473> Play ${info.title}`
      )
      connection
        .play(
          ytdl(args.source, {
            filter: 'audioonly',
          })
        )
        .on('finish', () => {
          voiceChannel.leave()
          audioStore.connections = audioStore.connections.filter(
            (c) => c !== connection
          )
        })

      audioStore.connections.push(connection)
    } else {
      return this.reply(`Invalid audio source ${this.inlineCode(args.source)}.`)
    }
  }

  /**
   * Returns parsed arguments.
   *
   * @param request
   */
  getArgs(request: CommandRequest) {
    return this.parseArgs<AudioPlayCommand>(request)
  }
}

export const musicPlay = new AudioPlayCommand()
