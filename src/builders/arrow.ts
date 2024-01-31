import { ArrowData } from '../utils/construct'
import { getShiftValue, toHTMLArrow } from '../utils/utilities'

export class ArrowBuilder {
  public element: HTMLElement
  public width: number
  public height: number
  public padding: number
  public color: string
  public shift: number

  constructor(arrow: ArrowData) {
    this.element = toHTMLArrow(arrow.element)
    this.width = arrow.width
    this.height = arrow.height
    this.padding = arrow.padding
    this.color = arrow.color
    this.shift = getShiftValue(arrow.shift)
    this.drawArrow()
  }

  private drawArrow() {
    this.element.style.width = `${this.width}px`
    this.element.style.height = `${this.height}px`
    this.element.style.position = 'absolute'
    this.element.style.margin = '0 auto auto auto'
    this.element.style.top = `0px`
    this.element.style.left = `0px`
    this.element.style.right = `0px`
    this.element.style.bottom = `0px`
    this.element.setAttribute('fill', this.color)
    this.element.style.transform = `rotate(${this.shift}deg)`
    this.element.style.zIndex = '1'
  }
}
