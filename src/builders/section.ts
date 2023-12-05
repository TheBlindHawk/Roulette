import { RefinedSectionData, SectionData, SettingData } from "../utils/construct"
import { defaultBackground, defaultProbability } from "../utils/defaults"
import errors from "../utils/errors"

export class SectionBuilder {
    private sections: RefinedSectionData[]
    private colors: string[]
    public probabilities?: number[]
    public length: number

    constructor(section : SectionData[], colors: string[], settings: SettingData) {
        this.colors = colors
        const array =  typeof section === "number" ? Array(section).fill(0) : section
        this.length = array.length
        this.sections = array.map((section, index) => {
            if(typeof section === 'number') {
                return {
                    index,
                    ...settings,
                    probability: section,
                    background: this.pluckColor(index),
                    text: index.toString() ?? defaultBackground,
                }
            } else if (typeof section === 'string') {
                return {
                    index,
                    ...settings,
                    probability: defaultProbability,
                    background: this.pluckColor(index) ?? defaultBackground,
                    text: section,
                }
            } else if(section instanceof Object) {
                return {
                    index,
                    ...settings,
                    probability: section.probability ?? defaultProbability,
                    background: section.color ?? this.pluckColor(index) ?? defaultBackground,
                    section
                }
            }
            else throw new Error(errors.invalidSection(index))
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
}
