import { Command, VoiceChannel } from 'quro'
import { audioStore } from './store'

/*
 * AudioCommand class.
 */
export abstract class AudioCommand extends Command {
  /**
   * Returns channel connection.
   *
   * @param channel
   */
  getChannelConnection(channel: VoiceChannel) {
    return audioStore.connections.find(
      (connection) => connection.channel === channel
    )
  }
}
