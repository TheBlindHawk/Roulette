/* @jest-environment jsdom */
/* jslint browser: true */
/* global document */
import { test, vi } from 'vitest'
import Roulette from '../src/index'

vi.useFakeTimers({ shouldAdvanceTime: true })
document.body.innerHTML = `<div id="roulette"></div>`

test('roulette constructor id search fail', () => {
  expect(() => new Roulette({ container: 'bad-roulette-id', sections: [1, 2, 3] })).toThrow()
})

test('roulette section invalid data', () => {
  expect(() => new Roulette({ container: 'roulette', sections: [1, 2, null] })).toThrow()
})

test('roulette roll search fail', () => {
  const roulette = new Roulette({ container: 'roulette', sections: [1, 2, 3] })
  const last_roll = roulette.roll(15)
  expect(last_roll).toBe(undefined)
})

test('roulette rollIndex search fail', () => {
  const roulette = new Roulette({ container: 'roulette', sections: [1, 2, 3] })
  const last_roll = roulette.rollByIndex(15)
  expect(last_roll).toBe(undefined)
})

test('roulette rollProbabilities length out of bounds', () => {
  const roulette = new Roulette({ container: 'roulette', sections: [1, 2, 3] })
  const last_roll = roulette.rollProbabilities([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  expect(last_roll).toBe(undefined)
})

test('roulette double roll canceling', () => {
  const roulette = new Roulette({ container: 'roulette', sections: ['a', 'b', 'c'] })
  const first_roll = roulette.rollByIndex(2)
  const second_roll = roulette.rollByIndex(2)
  expect(first_roll).toBe('c')
  expect(second_roll).toBe(undefined)
})
