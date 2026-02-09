-- carousel 테이블에 has_captions 컬럼 추가
ALTER TABLE public.carousel 
ADD COLUMN IF NOT EXISTS has_captions BOOLEAN DEFAULT false;

-- 기존 데이터에 대한 설명
-- 기존 데이터는 모두 false로 설정됩니다.
-- 필요시 UPDATE 문으로 수동으로 업데이트할 수 있습니다.
