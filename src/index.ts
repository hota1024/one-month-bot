import {
  QuroBot,
  CommandFileLoader,
  QuroError,
  CommandNotFoundError,
  TextChannel,
  QuroBotOptions,
} from 'quro'
import * as dotenv from 'dotenv'
import * as path from 'path'
import { version } from '../package.json'
import { MinecraftPing } from './MinecraftPing'
import * as schedule from 'node-schedule'

dotenv.config()

export class Bot extends QuroBot {
  prefixes = ['$']

  version = version

  constructor(options?: QuroBotOptions) {
    super(options)
  }

  /**
   * Setup.
   */
  async setup() {
    console.log('Setting up.')
    await this.registerDirectoryCommands('./commands')
    this.commandManager.addErrorListener(this.reportError.bind(this))

    console.log('Setup is done.')

    this.onReady(() => console.log('On ready.'))
    this.onReady(() => {
      const ping = new MinecraftPing('153.127.29.105')
      setInterval(async () => {
        const result = await ping.ping()

        if (result.online) {
          this.client.user.setPresence({
            activity: {
              name: `[${result.currentPlayers} players online.]`,
            },
          })
        } else {
          this.client.user.setPresence({
            activity: {
              name: 'Server is currently offline.',
            },
          })
        }
      }, 2000)
    })
    this.onReady(() => {
      schedule.scheduleJob('0 0 7 * * *', async () => {
        const channel = await this.client.channels.cache.find(
          (channel) => channel.id === '696343395127394316'
        )
        if (new Date().getMonth() !== 3) return
        const currentDay = new Date().getDate()
        if (channel instanceof TextChannel) {
          if (currentDay === 30) {
            channel.send(
              `@everyone 今日はOneMonthサーバー最終日です！最後まで遊び倒しましょう！`
            )
          } else {
            channel.send(
              `@everyone 今日は${currentDay}日目です！残り${
                30 - currentDay
              }日間！`
            )
          }
        }
      })
    })
  }

  /**
   * Register directory commands.
   *
   * @param directoryPath
   */
  private async registerDirectoryCommands(directoryPath: string) {
    const commandLoader = new CommandFileLoader()
    this.registerCommands(
      await commandLoader.load(path.resolve(__dirname, directoryPath))
    )
  }

  /**
   * Report error.
   *
   * @param error
   */
  private reportError(error: QuroError) {
    if (error instanceof CommandNotFoundError) {
      console.log(error.data)
      error.data.message.react('❓')
      return
    }
  }
}

const bot = new Bot()
bot.start(process.env.DISCORD_BOT_TOKEN)
