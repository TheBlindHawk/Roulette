import { arrows } from '../resources/arrows'
import { ShiftOptions } from './construct'
import errors from './errors'

export const toHTMLElement = (element: string | HTMLElement): HTMLElement => {
  if (typeof element !== 'string') return element
  const el = document.getElementById(element)
  if (el === null) throw new Error(errors.invalidContainer(element))
  return el as HTMLElement
}

export const toHTMLBoard = (element: string | HTMLElement): HTMLElement => {
  if (typeof element !== 'string') return element
  const el = document.getElementById(element)
  if (el === null) throw new Error(errors.invalidContainer(element))
  return el as HTMLElement
}

export function toHTMLArrow(element: string | HTMLElement) {
  if (element instanceof HTMLElement) return element
  const arrow = arrows[element] ? arrows[element] : element
  const parser = new DOMParser()
  const doc = parser.parseFromString(arrow, 'image/svg+xml')
  return doc.documentElement
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
