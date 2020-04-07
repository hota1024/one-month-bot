import { Command, User } from 'quro'
import { google } from 'googleapis'
import { YouTubePickItem, youtubeStore } from './store'

const youtube = google.youtube({
  version: 'v3',
  auth: process.env.YOUTUBE_API_KEY,
})

/*
 * YouTubeCommand class
 */
export abstract class YouTubeCommand extends Command {
  /**
   * Set user pick.
   *
   * @param user
   * @param pick
   */
  setPick(user: User, pick: YouTubePickItem[]) {
    youtubeStore.picks.set(user.id, pick)
  }

  /**
   * Returns user pick.
   *
   * @param user
   */
  getPick(user: User) {
    return youtubeStore.picks.get(user.id)
  }

  /**
   * Returns whether user has pick.
   *
   * @param user
   */
  hasPick(user: User) {
    return youtubeStore.picks.has(user.id)
  }

  /**
   * Search movie.
   *
   * @param query
   */
  protected async searchMovie(query: string) {
    const request = await youtube.search.list({
      q: query,
      part: 'snippet',
    })
    return request.data.items
  }
}
