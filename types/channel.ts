/**
 * 채널 관련 타입 정의
 */

export interface ChannelInfo {
  id: string;
  title: string;
  subscriberCount: number;
  channelLink: string;
  lastUploadDate: string | null;
  averageUploadInterval: number | null; // 일 단위
}

export interface YouTubeChannel {
  id: string;
  snippet: {
    title: string;
    customUrl?: string;
  };
  statistics: {
    subscriberCount: string;
  };
  contentDetails?: {
    relatedPlaylists?: {
      uploads?: string;
    };
  };
}

export interface YouTubeVideo {
  id: string;
  snippet: {
    publishedAt: string;
  };
}

export interface SearchResult {
  id: {
    channelId: string;
  };
  snippet: {
    title: string;
  };
}
