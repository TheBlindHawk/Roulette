/* @jest-environment jsdom */
/* jslint browser: true */
/* global document window */
import { test, vi } from 'vitest'
import Roulette from '../src/index'

vi.useFakeTimers({ shouldAdvanceTime: true })
vi.spyOn(window.HTMLMediaElement.prototype, 'play').mockImplementation(() => {})
document.body.innerHTML = `<div id="roulette"></div>`
Promise.withResolvers = () => {
  let resolve, reject
  const promise = new Promise((res, rej) => {
    resolve = res, reject = rej
  })
  return { promise, resolve, reject }
}

test('roulette asyncRollByIndex', async () => {
  const roulette = new Roulette({ container: 'roulette', sections: ['a', 'b', 'c'] })
  const { promise, resolve } = Promise.withResolvers()
  const last_roll = roulette.asyncRollByIndex(promise)
  vi.advanceTimersByTime(10000) // 10 seconds API delay
  resolve(0)
  vi.advanceTimersByTime(10000)
  expect(await last_roll).toStrictEqual(roulette.sections[0])
})
