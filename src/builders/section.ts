import { RefinedSectionData, SectionData, SettingData } from '../utils/construct'
import { defaultBackground, defaultProbability } from '../utils/defaults'
import errors from '../utils/errors'

export class SectionBuilder {
  private sections: RefinedSectionData[]
  private colors: string[]
  public probabilities: number[]
  public length: number

  constructor(sections: SectionData[], colors: string[], settings: SettingData) {
    this.colors = colors
    this.length = sections.length
    this.probabilities = []
    this.sections = sections.map((section, index) => {
      if (typeof section === 'number') {
        this.probabilities.push(defaultProbability)
        return {
          index,
          ...settings,
          probability: defaultProbability,
          background: this.pluckColor(index) ?? defaultBackground,
          value: section.toString(),
        }
      } else if (typeof section === 'string') {
        this.probabilities.push(defaultProbability)
        return {
          index,
          ...settings,
          probability: defaultProbability,
          background: this.pluckColor(index) ?? defaultBackground,
          value: section,
        }
      } else if (section instanceof Object) {
        this.probabilities.push(
          section.probability !== undefined
            ? section.probability
            : defaultProbability,
        )
        return {
          index,
          ...settings,
          ...section,
          probability: section.probability ?? defaultProbability,
          background: section.background ?? this.pluckColor(index) ?? defaultBackground,
          value: section.value ?? (index + 1).toString(),
        }
      } else throw new Error(errors.invalidSection(index))
    })
  }

  private pluckColor(index: number) {
    return this.colors[index % this.colors.length]
  }

  public map<T>(callback: (section: RefinedSectionData, index: number) => T) {
    return this.sections.map(callback)
  }

  public find(index: number) {
    return this.sections[index]
  }

  public getSectionElement(section: RefinedSectionData, translate: string, rotate: string) {
    if(section.src && section.radius) {
      const img = document.createElementNS('http://www.w3.org/2000/svg', 'image')
      img.setAttribute('transform', translate + rotate)
      img.setAttribute('href', section.src)
      img.setAttribute('x', `-${section.radius}`)
      img.setAttribute('y', `-${section.radius}`)
      img.setAttribute('width', `${section.radius * 2}`)
      img.setAttribute('height', `${section.radius * 2}`)
      return img
    }
    return this.getSectionText(section, translate, rotate)
  }

  public getSectionText(section: RefinedSectionData, translate: string, rotate: string) {
    const txt = document.createElementNS('http://www.w3.org/2000/svg', 'text')
    txt.setAttribute('transform', translate + rotate)
    txt.setAttribute('text-anchor', 'middle')
    txt.setAttribute('dominant-baseline', 'middle')
    txt.setAttribute('fill', section.font_color)
    txt.setAttribute('font-family', section.font)
    txt.setAttribute('font-size', section.font_size.toString())
    txt.textContent = section.value

    return txt
  }
}
