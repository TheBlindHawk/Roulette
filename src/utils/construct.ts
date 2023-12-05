export type Construct = {
    container: string | HTMLElement,
    board: BoardData,
    arrow: ArrowData,
    sections: SectionData[],
    settings: SettingData,
    colors: string[],
    audio: AudioData,
}

/* Data type section start */

export type BoardData = {
    element?: string | HTMLElement,
    doughnut?: { radius: number, color: string }
    shift: number,
    border: BorderData,
    radius: number,
    padding: number,
}

export type ArrowData = {
    element: string | HTMLElement,
    shift: ShiftOptions,
    width: number,
    height: number,
    color: string,
}

export type SectionData = 
    ((number | string)
    | {
        background?: string,
        probability?: number,
        text?: string,
        font: string,
        font_size: number,
        font_color: string,
    }
    | {
        background?: string,
        probability?: number,
        src: string,
        radius: number,
    })

export type RefinedSectionData = {
    index: number,
    background?: string,
    probability: number,
    text?: string,

    font: string,
    font_size: number,
    font_color: string,

    src?: string,
    radius?: number,
    padding?: number,
}

export type SettingData = {
    roll: RollOptions,
    // general overridable options
    font: string,
    font_size: number,
    font_weight: number,
    font_color: string,
    border: BorderData
}

export type AudioData = {
    src: string,
    volume: number,
    play: AudioPlayOptions,
}

export type AudioPlayOptions = {
    once: boolean
    every:{
        milliseconds: number
        sections: number
    }
    mute: boolean
}


export type BorderData = {
    width: number,
    color: string,
    line_width: number,
    line_color: string,
}

/* Data type section end */

/* Options&Types section start */

export type RollOptions = {
    duration: number,
    landing: LandingTypes,
    delay: number,
}

export type ShiftOptions =
    | number
    | 'left'
    | 'right'
    | 'top'
    | 'bottom'

export type LandingTypes =
    | 'random'
    | 'center'
    | 'edge'

/* Options&Types section end */
