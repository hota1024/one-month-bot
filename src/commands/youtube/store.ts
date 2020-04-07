import { youtube_v3 as YoutubeV3 } from 'googleapis'

/*
 * UserID type.
 */
export type UserID = string

/**
 * YoutubePickItem type.
 */
export type YouTubePickItem = YoutubeV3.Schema$SearchResult

/*
 * YouTubeStore type.
 */
export type YouTubeStore = {
  picks: Map<UserID, YouTubePickItem[]>
}

export const youtubeStore: YouTubeStore = {
  picks: new Map(),
}
