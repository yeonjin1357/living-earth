import { describe, expect, it } from 'vitest'
import { timeAgo } from './format'

const NOW = 1_755_530_000_000

describe('timeAgo', () => {
  it('says 방금 전 for under a minute', () => {
    expect(timeAgo(NOW, NOW - 30_000)).toBe('방금 전')
  })

  it('says n분 전 for under an hour', () => {
    expect(timeAgo(NOW, NOW - 5 * 60_000)).toBe('5분 전')
    expect(timeAgo(NOW, NOW - 59 * 60_000)).toBe('59분 전')
  })

  it('says n시간 전 for under a day', () => {
    expect(timeAgo(NOW, NOW - 3 * 3_600_000)).toBe('3시간 전')
  })

  it('says n일 전 for a day or more', () => {
    expect(timeAgo(NOW, NOW - 26 * 3_600_000)).toBe('1일 전')
  })

  it('treats future timestamps as 방금 전', () => {
    expect(timeAgo(NOW, NOW + 10_000)).toBe('방금 전')
  })
})
