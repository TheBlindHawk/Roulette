/* @jest-environment jsdom */
/* jslint browser: true */
/* global document window */
import { test, vi } from 'vitest'
import Roulette from '../src/index'

vi.useFakeTimers({ shouldAdvanceTime: true })
vi.spyOn(window.HTMLMediaElement.prototype, 'play').mockImplementation(() => {})
document.body.innerHTML = `<div id="roulette"></div>`

test('roulette rollByIndex', () => {
  const roulette = new Roulette({ container: 'roulette', sections: ['a', 'b', 'c'] })
  const last_roll = roulette.rollByIndex(0)
  vi.advanceTimersByTime(10000)
  expect(last_roll).toBe('a')
})

test('roulette roll value index', () => {
  const roulette = new Roulette({ container: 'roulette', sections: [1, 2, 3] })
  const last_roll = roulette.roll('3')
  vi.advanceTimersByTime(10000)
  expect(last_roll).toBe('3')
})

test('roulette roll value string', () => {
  const roulette = new Roulette({ container: 'roulette', sections: ['a', 'b', 'c'] })
  const last_roll = roulette.roll('a')
  vi.advanceTimersByTime(10000)
  expect(last_roll).toBe('a')
})

test('roulette roll probabilities', () => {
  const roulette = new Roulette({
    container: 'roulette',
    sections: [
      { value: 'a', probability: 7 },
      { value: 'b', probability: 2 },
      { value: 'c', probability: 2 },
    ],
  })
  const last_roll = roulette.rollProbabilities()
  vi.advanceTimersByTime(10000)
  expect(last_roll).not.toBe(undefined)
})

test('roulette roll definite probabilities', () => {
  const roulette = new Roulette({
    container: 'roulette',
    sections: [
      { value: 'a', probability: 1 },
      { value: 'b', probability: 0 },
      { value: 'c', probability: 0 },
    ],
  })
  const last_roll = roulette.rollProbabilities()
  vi.advanceTimersByTime(10000)
  expect(last_roll).toBe('a')
})

test('roulette roll undefined', () => {
  const roulette = new Roulette({ container: 'roulette', sections: [1, 2, 3] })
  const last_roll = roulette.roll()
  vi.advanceTimersByTime(10000)
  expect(last_roll).not.toBe(undefined)
})
