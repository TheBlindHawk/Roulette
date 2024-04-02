/* @jest-environment jsdom */
/* jslint browser: true */
/* global document window */
import { test, vi } from 'vitest'
import Roulette from '../src/index'

vi.useFakeTimers({ shouldAdvanceTime: true })
vi.spyOn(window.HTMLMediaElement.prototype, 'play').mockImplementation(() => {})
document.body.innerHTML = `<div id="roulette"></div>`

test('roulette constructor', () => {
  const roulette = new Roulette({ container: 'roulette', sections: [1, 2, 3] })
  expect(roulette).toBeInstanceOf(Roulette)
})

test('roulette constructor all_items', () => {
  const roulette = new Roulette({
    container: 'roulette',
    board: { element: document.createElement('div') },
    audio: { play: { every: { sections: 1 } } },
    settings: { roll: { landing: 'fixed' } },
    sections: [
      { value: 'a', probability: 2 },
      { probability: 4 },
      { value: 'c', probability: 2 },
      { value: 'd' },
    ],
  })
  roulette.onstart = () => {}
  roulette.onstop = () => {}
  roulette.roll()
  vi.advanceTimersByTime(10000)
  expect(roulette).toBeInstanceOf(Roulette)
})

test('roulette timers forwards', () => {
  const roulette = new Roulette({ container: 'roulette', sections: [1, 2, 3] })
  roulette.onstop = () => {}
})
