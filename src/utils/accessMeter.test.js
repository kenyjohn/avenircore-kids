/* global global */
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { getAccessState, incrementRead, markAsSubscriber } from './accessMeter'

describe('accessMeter', () => {
  beforeEach(() => {
    // Mock localStorage
    const store = {}
    global.window = {}
    global.localStorage = {
      getItem: (key) => store[key] || null,
      setItem: (key, value) => { store[key] = value.toString() },
      removeItem: (key) => { delete store[key] },
      clear: () => { Object.keys(store).forEach(k => delete store[k]) }
    }
    // Mock document.cookie
    global.document = { cookie: '' }
  })

  afterEach(() => {
    global.localStorage.clear()
    global.document.cookie = ''
  })

  it('returns default state when empty', () => {
    const state = getAccessState()
    expect(state).toEqual({
      storiesRead: 0,
      blogRead: 0,
      isSubscriber: false,
    })
  })

  it('increments storiesRead', () => {
    incrementRead('story')
    incrementRead('story')
    const state = getAccessState()
    expect(state.storiesRead).toBe(2)
  })

  it('increments blogRead', () => {
    incrementRead('blog')
    const state = getAccessState()
    expect(state.blogRead).toBe(1)
  })

  it('marks as subscriber and sets cookie', () => {
    markAsSubscriber()
    const state = getAccessState()
    expect(state.isSubscriber).toBe(true)
    expect(global.document.cookie).toContain('ac_subscriber=true')
  })
})
