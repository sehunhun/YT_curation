-- carousel 테이블에 자막 유무 컬럼 추가
ALTER TABLE public.carousel 
ADD COLUMN IF NOT EXISTS has_captions BOOLEAN DEFAULT false;

-- 인덱스 추가 (자막 필터링 성능 향상)
CREATE INDEX IF NOT EXISTS idx_carousel_has_captions ON public.carousel(has_captions);
