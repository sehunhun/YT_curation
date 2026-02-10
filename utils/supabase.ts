import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase 환경 변수가 설정되지 않았습니다. .env 파일을 확인해주세요.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface CarouselRow {
  id: number;
  video_id: string;
  thumbnail: string;
  title: string;
  channel_name: string;
  published_at: string;
  has_captions: boolean;
  created_at: string;
}

export interface ContentsRow {
  id?: number;
  video_id: string;
  published_date: string;
  channel_name: string;
  channel_url?: string;
  case_name: string | null;
  video_thumbnail?: string | null;
  created_at: string;
  // 기타 필드들 (선택적)
  age?: string | null;
  job?: string | null;
  tool?: string | null;
  revenue_model?: string | null;
  revenue_per_unit?: string | null;
  category?: string | null;
}