/* @jest-environment jsdom */
/* jslint browser: true */
/* global document window */
import { test, vi } from 'vitest'
import Roulette from '../src/index'

vi.useFakeTimers({ shouldAdvanceTime: true })
vi.spyOn(window.HTMLMediaElement.prototype, 'play').mockImplementation(() => {})
document.body.innerHTML = `<div id="roulette"></div>`

test('roulette asyncRoll by index', () => {
  const roulette = new Roulette({ container: 'roulette', sections: ['a', 'b', 'c'] })
  const { promise, resolve } = Promise.withResolvers()
  const last_roll = roulette.asyncRoll(promise)
  vi.advanceTimersByTime(2000) // 2 seconds API delay
  resolve(0)
  vi.advanceTimersByTime(10000)
  expect(last_roll).toBe('a')
})