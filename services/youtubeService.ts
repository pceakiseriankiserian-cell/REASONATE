
/**
 * YouTube Data API Service
 * Handles searching for music videos and retrieving metadata.
 */

const YOUTUBE_API_KEY = 'AIzaSyAC7l5_qOHHLPrcw53WPLEi_mkrdipC2dU';

export interface YouTubeSearchResult {
  videoId: string;
  thumbnailUrl: string;
  title: string;
}

/**
 * Searches YouTube for a song and returns the first video result's ID and thumbnail.
 * @param songName The name of the song and artist to search for.
 * @returns An object containing the video ID and thumbnail URL, or null if not found.
 */
export const getYouTubeVideoData = async (songName: string): Promise<YouTubeSearchResult | null> => {
  if (!songName) return null;

  try {
    const query = encodeURIComponent(songName);
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${query}&type=video&key=${YOUTUBE_API_KEY}`;

    const response = await fetch(url);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to fetch from YouTube API');
    }

    const data = await response.json();

    if (data.items && data.items.length > 0) {
      const item = data.items[0];
      return {
        videoId: item.id.videoId,
        thumbnailUrl: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default?.url,
        title: item.snippet.title,
      };
    }

    return null;
  } catch (error) {
    console.error('YouTube Search Error:', error);
    return null;
  }
};
