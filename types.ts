
export interface CarouselItem {
  id: string;
  video_id: string;
  thumbnail: string;
  title: string;
  channel_name: string;
  published_at: string;
  has_captions: boolean;
}

export interface NavLink {
  label: string;
  href: string;
}
