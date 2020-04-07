import * as net from 'net'

export type MinecraftPingData =
  | {
      /**
       * Whether is online.
       */
      online: false
    }
  | {
      /**
       * Whether is online.
       */
      online: true

      /**
       * Server minecraft version.
       */
      version: string

      /**
       * Server description.
       */
      description: string

      /**
       * Current online players.
       */
      currentPlayers: number

      /**
       * Max players count.
       */
      maxPlayers: number
    }

/**
 * MinecraftPing class.
 */
export class MinecraftPing {
  /**
   * Host.
   */
  readonly host: string

  /**
   * Port.
   */
  readonly port: number

  /**
   * MinecraftPing constructor.
   *
   * @param host
   * @param port
   */
  constructor(host: string, port = 25565) {
    this.host = host
    this.port = port
  }

  /**
   * Get ping.
   */
  async ping() {
    const client = this.createClient()
    return new Promise<MinecraftPingData>((resolve) => {
      client.on('data', (data) => {
        const serverInfo = data
          .toString()
          .split('\x00\x00\x00')
          // eslint-disable-next-line no-control-regex
          .map((info) => info.replace(/\u0000/g, ''))
        if (serverInfo !== null && serverInfo.length >= 6) {
          resolve({
            online: true,
            version: serverInfo[2],
            description: serverInfo[3],
            currentPlayers: parseInt(serverInfo[4]),
            maxPlayers: parseInt(serverInfo[5]),
          })
        } else {
          resolve({
            online: false,
          })
        }
      })
    })
  }

  /**
   * Create TCP client.
   */
  private createClient() {
    const client = net.connect(this.port, this.host, () => {
      const buff = Buffer.from([0xfe, 0x01])
      client.write(buff)
    })
    return client
  }
}
