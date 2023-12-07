import { SectionBuilder, BoardBuilder, ArrowBuilder, AudioBuilder } from './builders'
import { Construct, SettingData, SectionData } from './utils/construct'
import { toHTMLElement } from './utils/utilities'
import { defaultSettings } from './utils/defaults'
import errors from './utils/errors'

export class Roulette {
  private container: HTMLElement
  private board: BoardBuilder
  private arrow: ArrowBuilder
  private settings: SettingData
  private sections: SectionBuilder
  private audio: AudioBuilder
  private rotation = 0
  private rolling = false
  public onstart?: (roll: SectionData) => void
  public onstop?: (roll: SectionData) => void

  constructor(c: Construct) {
    this.settings = { ...defaultSettings, ...c.settings }
    this.container = toHTMLElement(c.container)
    this.board = new BoardBuilder(c.board)
    this.arrow = new ArrowBuilder(c.arrow)
    this.sections = new SectionBuilder(c.sections, c.colors, this.settings)
    this.audio = new AudioBuilder(c.audio)
    this.drawSVGRoulette()
    this.container.appendChild(this.board.element)
    this.container.appendChild(this.arrow.element)
    this.container.style.position = 'relative'
  }

  roll(value?: string | number) {
    if (typeof value === 'undefined') return this.rollRandom()

    const indexes: number[] = []
    for (let i = 0; i < this.sections.length; i++) {
      if (this.sections.find(i).value === value) {
        indexes.push(i)
      }
    }
    if (indexes.length <= 0) {
      return console.error(errors.roulette_no_such_value)
    }
    const random = Math.floor(Math.random() * indexes.length)
    this.rollByIndex(indexes[random])
  }

  rollRandom() {
    const random = Math.floor(Math.random() * this.sections.length)
    this.rollByIndex(random)
  }

  rollProbabilities(probabilities?: number[]) {
    const probs = probabilities ?? this.sections.probabilities
    if (probs.length <= 0 || this.sections.length != probs.length) {
      throw errors.probability_mismatch
    }

    let counter = 0
    const total = probs.reduce((a, b) => a + b, 0)
    const random = Math.floor(Math.random() * total)

    for (let i = 0; i < probs.length; i++) {
      counter += probs[i]
      if (counter > random) {
        this.rollByIndex(i)
        break
      }
    }
  }

  public rollByIndex(index: number) {
    if (this.rolling) {
      throw errors.roulette_is_rolling
    }

    const section = this.sections.find(index)
    this.onstart?.(section)
    this.rolling = true

    let milliseconds = 0
    let rotation = this.rotation
    const sections = this.sections.length
    const point = (360 * index) / this.sections.length + 360 / this.sections.length / 2 - this.arrow.shift
    const loosen =
      this.settings.roll.landing === 'random' ? Math.round((Math.random() * 320) / sections - 320 / sections / 2) : 0
    const sprint = Math.floor(this.settings.roll.duration / 360 / 3) * 360 + point + loosen

    const audio_distance = 360 / this.sections.length
    let audio_counter = (rotation + this.board.shift) % audio_distance

    this.audio.playOnce()

    const ival = setInterval(() => {
      const next_rotation =
        -sprint * (milliseconds /= this.settings.roll.duration) * (milliseconds - 2) - this.board.shift
      audio_counter += next_rotation - rotation
      rotation = next_rotation

      this.board.rotateImage((rotation % 360) * -1)

      if (audio_counter >= audio_distance) {
        this.audio.playOnSection()
        audio_counter -= audio_distance
      }

      if (rotation >= sprint || milliseconds >= this.settings.roll.duration) {
        clearInterval(ival)
        this.rotation = rotation % 360
        this.rolling = false
        this.onstop?.(section)
      }
      milliseconds += 20
    }, 20)
  }

  private drawSVGRoulette() {
    if (this.board.custom_image) return

    const radius = this.board.radius - this.board.padding
    const angle = (Math.PI * 2) / this.sections.length
    const rotation = 360 / this.sections.length
    this.board.element.style.fontSize = this.settings.font_size + 'px'
    this.board.element.style.fontWeight = `${this.settings.font_weight}`

    this.sections.map((section, index) => {
      const degree = rotation * (index + 0.5) + this.board.shift
      const tx = (radius - radius / 3) * Math.sin(angle * (index + 0.5)) + radius + this.board.padding
      const ty = (radius - radius / 3) * -Math.cos(angle * (index + 0.5)) + radius + this.board.padding
      const translate = 'translate(' + tx + ',' + ty + ')'
      const rotate = 'rotate(' + degree + ')'
      const text = section.value ?? section.index.toString()
      const font_size = section.font_size ?? this.settings.font_size

      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g')
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
      const txt = document.createElementNS('http://www.w3.org/2000/svg', 'text')

      path.setAttribute('d', this.getSector(radius, this.board.padding, this.sections.length, index))
      path.setAttribute('fill', section.background ?? '#fff')
      path.setAttribute('stroke', this.settings.border.color)
      path.setAttribute('stroke-width', this.settings.border.width.toString())

      txt.setAttribute('transform', translate + rotate)
      txt.setAttribute('text-anchor', 'middle')
      txt.setAttribute('dominant-baseline', 'middle')
      txt.setAttribute('fill', section.font_color)
      txt.setAttribute('font-family', section.font)
      txt.setAttribute('font-size', font_size.toString())
      txt.textContent = text

      g.appendChild(path)
      g.appendChild(txt)
      this.board.element.appendChild(g)
    })

    this.container.appendChild(this.board.element)
  }

  private getSector(r: number, p: number, s: number, i: number) {
    const a1 = (360 / s) * i - 90
    const a2 = (360 / s) * (i + 1) - 90
    const degtorad = Math.PI / 180
    const cx1 = Math.cos(degtorad * a1) * r + r + p
    const cy1 = Math.sin(degtorad * a1) * r + r + p
    const cx2 = Math.cos(degtorad * a2) * r + r + p
    const cy2 = Math.sin(degtorad * a2) * r + r + p

    return `M${r + p} ${r + p} ${cx1} ${cy1} A${r} ${r} 0 0 1 ${cx2} ${cy2}Z`
  }
}
