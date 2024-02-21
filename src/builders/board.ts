import { BoardData, BorderData } from '../utils/construct'
import { toHTMLBoard } from '../utils/utilities'

export class BoardBuilder {
  public element: HTMLElement | SVGSVGElement
  public custom_image: boolean
  public doughnut: { radius: number; color: string } | undefined
  public shift: number
  public border: BorderData
  public radius: number
  public padding: number

  constructor(board: BoardData) {
    this.shift = board.shift
    this.border = board.border
    this.radius = board.radius
    this.padding = board.padding
    this.doughnut = board.doughnut
    if (board.element) {
      this.element = toHTMLBoard(board.element)
      this.element.style.width = `${this.radius * 2 - this.padding * 2}px`
      this.element.style.height = `${this.radius * 2 - this.padding * 2}px`
      this.element.style.padding = `${this.padding}px`
    } else {
      this.element = this.createSVGBoard()
    }
    this.custom_image = !!board.element
  }

  public rotateImage(degrees: number) {
    this.element.style.transform = `rotate(${degrees}deg)`
  }

  private createSVGBoard() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svg.setAttribute('width', `${this.radius * 2}`)
    svg.setAttribute('height', `${this.radius * 2}`)
    svg.setAttribute('viewBox', `0 0 ${this.radius * 2} ${this.radius * 2}`)
    svg.setAttribute('id', 'roulette-circle')
    svg.style.transform = `rotate(${this.shift * -1}deg)`
    return svg
  }
}
