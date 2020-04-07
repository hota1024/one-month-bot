import { VoiceConnection } from 'quro'

/*
 * AudioStore type.
 */
export type AudioStore = {
  /**
   * Connections.
   */
  connections: VoiceConnection[]
}

/**
 * AudioStore.
 */
export const audioStore: AudioStore = {
  /**
   * Connections.
   */
  connections: [],
}
