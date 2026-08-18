/** 발생 시각을 "방금 전 / n분 전 / n시간 전 / n일 전"으로 표기한다. */
export function timeAgo(now: number, time: number): string {
  const elapsed = now - time
  if (elapsed < 60_000) return '방금 전'
  if (elapsed < 3_600_000) return `${Math.floor(elapsed / 60_000)}분 전`
  if (elapsed < 86_400_000) return `${Math.floor(elapsed / 3_600_000)}시간 전`
  return `${Math.floor(elapsed / 86_400_000)}일 전`
}
