import errors from './errors'
import { arrows } from '../resources/arrows'
import { ShiftOptions } from './construct'

export const toHTMLElement = (element: string | HTMLElement): HTMLElement => {
  if (typeof element !== 'string') return element
  const el = document.querySelector(element)
  if (el === null) throw new Error(errors.invalidContainer(element))
  return el as HTMLElement
}

export const toHTMLBoard = (element: string | HTMLElement): HTMLElement => {
  if (typeof element !== 'string') return element
  const el = document.querySelector(element)
  if (el === null) throw new Error(errors.invalidContainer(element))
  return el as HTMLElement
}

export function toHTMLArrow(element: string | HTMLElement) {
  if (element instanceof HTMLElement) return element
  const arrow = arrows[element] ? arrows[element] : element
  const template = document.createElement('template')
  template.innerHTML = arrow.trim()
  return template.content.firstChild as HTMLElement
}

export function getShiftValue(shift: ShiftOptions) {
  switch (shift) {
    case 'top':
      return 0
    case 'left':
      return 90
    case 'bottom':
      return 180
    case 'right':
      return 270
    default:
      return shift
  }
}
