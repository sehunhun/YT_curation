import React from 'react';
import { ChannelInfo } from '../types/channel';

interface ChannelTableProps {
  channels: ChannelInfo[];
  isLoading?: boolean;
}

const ChannelTable: React.FC<ChannelTableProps> = ({ channels, isLoading }) => {
  /**
   * 날짜 포맷팅
   */
  const formatDate = (dateString: string | null): string => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  /**
   * 구독자 수 포맷팅
   */
  const formatSubscriberCount = (count: number): string => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toLocaleString();
  };

  /**
   * 평균 업로드 주기 포맷팅
   */
  const formatUploadInterval = (interval: number | null): string => {
    if (interval === null) return '-';
    if (interval < 1) {
      return `${Math.round(interval * 24)}시간`;
    }
    if (interval < 7) {
      return `${interval.toFixed(1)}일`;
    }
    if (interval < 30) {
      return `${Math.round(interval / 7)}주`;
    }
    return `${Math.round(interval / 30)}개월`;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-lg text-gray-400">채널 정보를 수집하는 중...</div>
      </div>
    );
  }

  if (channels.length === 0) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-lg text-gray-400">표시할 채널이 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse bg-card rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-card/80 border-b border-gray-700">
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">채널명</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">구독자 수</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">채널 링크</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">마지막 업로드일</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">평균 업로드 주기</th>
          </tr>
        </thead>
        <tbody>
          {channels.map((channel) => (
            <tr
              key={channel.id}
              className="border-b border-gray-700/50 hover:bg-card/50 transition-colors"
            >
              <td className="px-6 py-4 text-sm text-white font-medium">{channel.title}</td>
              <td className="px-6 py-4 text-sm text-gray-300">
                {formatSubscriberCount(channel.subscriberCount)}
              </td>
              <td className="px-6 py-4 text-sm">
                <a
                  href={channel.channelLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 underline"
                >
                  채널 보기
                </a>
              </td>
              <td className="px-6 py-4 text-sm text-gray-300">
                {formatDate(channel.lastUploadDate)}
              </td>
              <td className="px-6 py-4 text-sm text-gray-300">
                {formatUploadInterval(channel.averageUploadInterval)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ChannelTable;
