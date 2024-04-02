import { ArrowBuilder, AudioBuilder, BoardBuilder, SectionBuilder } from './builders'
import { OptionalConstruct, SectionData, SettingData } from './utils/construct'
import { defaultArrow, defaultAudio, defaultBoard, defaultSettings } from './utils/defaults'
import errors from './utils/errors'
import { toHTMLElement } from './utils/utilities'

export default class Roulette {
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

  constructor(c: OptionalConstruct) {
    this.settings = { ...defaultSettings, ...c.settings }
    this.container = toHTMLElement(c.container)
    this.board = new BoardBuilder({ ...defaultBoard, ...c.board })
    this.arrow = new ArrowBuilder({ ...defaultArrow, ...c.arrow })
    this.sections = new SectionBuilder(c.sections, c.colors ?? [], this.settings)
    this.audio = new AudioBuilder({ ...defaultAudio, ...c.audio })
    this.drawSVGRoulette()
    this.container.appendChild(this.board.element)
    this.container.appendChild(this.arrow.element)
    this.container.style.width = this.board.radius * 2 + 'px'
    this.container.style.height = this.board.radius * 2 + 'px'
    this.container.style.position = 'relative'
    this.container.style.margin = 'auto'
  }

  public roll(value?: string | number) {
    if (typeof value === 'undefined') {
      const random = Math.floor(Math.random() * this.sections.length)
      return this.rollByIndex(random)
    }

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
    return this.rollByIndex(indexes[random])
  }

  public rollProbabilities(probabilities?: number[]) {
    const probs = probabilities ?? this.sections.probabilities
    if (probs.length <= 0 || this.sections.length !== probs.length) {
      console.error(errors.probability_mismatch)
      return
    }

    let counter = 0
    const total = probs.reduce((a, b) => a + b, 0)
    const random = Math.floor(Math.random() * total)

    for (let i = 0; i < probs.length; i++) {
      counter += probs[i]
      if (counter > random) {
        return this.rollByIndex(i)
      }
    }
  }

  public rollByIndex(index: number) {
    if (this.rolling) {
      console.error(errors.roulette_is_rolling)
      return
    }
    if (index < 0 || index >= this.sections.length) {
      console.error(errors.index_out_of_bounds(index))
      return
    }

    const section = this.sections.find(index)
    this.onstart?.(section)
    this.rolling = true

    let milliseconds = 0
    let rotation = this.rotation
    const sections = this.sections.length
    const point = (360 * index) / this.sections.length + 360 / this.sections.length / 2 - this.arrow.shift
    const loosen = this.settings.roll.landing === 'random'
      ? Math.round((Math.random() * 320) / sections - 320 / sections / 2)
      : 0
    const sprint = Math.floor(this.settings.roll.duration / 360 / 3) * 360 + point + loosen

    const audio_distance = 360 / this.sections.length
    let audio_counter = (rotation + this.board.shift) % audio_distance

    this.audio.playOnce()

    const ival = setInterval(() => {
      const next_rotation = -sprint
          * (milliseconds / this.settings.roll.duration)
          * (milliseconds / this.settings.roll.duration - 2)
        - this.board.shift
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
        this.onstop?.(section)
        this.rolling = false
      }
      milliseconds += 20
    }, 20)

    return section.value
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

      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g')
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')

      path.setAttribute('d', this.getSector(radius, this.board.padding, this.sections.length, index))
      path.setAttribute('fill', section.background)
      path.setAttribute('stroke', this.settings.border.color)
      path.setAttribute('stroke-width', this.settings.border.width.toString())

      const section_element = this.sections.getSectionElement(section, translate, rotate)

      g.appendChild(path)
      g.appendChild(section_element)
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
