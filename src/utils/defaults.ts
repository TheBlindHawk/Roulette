import { SettingData, AudioData, BoardData, BorderData, ArrowData } from './construct'

export const defaultFontColor = '#000'
export const defaultFont = 'Arial'
export const defaultFontWeight = 400
export const defaultBackground = '#fff'
export const defaultProbability = 1
export const defaultFontSize = 16

export const defaultBorder: BorderData = {
  width: 0,
  color: '#000',
  line_width: 0,
  line_color: '#000',
}

export const defaultBoard: BoardData = {
  element: '',
  radius: 120,
  padding: 20,
  border: defaultBorder,
  doughnut: {
    radius: 0,
    color: '#fff',
  },
  shift: 0,
}

export const defaultArrow: ArrowData = {
  element: '',
  width: 20,
  height: 20,
  padding: 0,
  color: '#000',
  shift: 0,
}

export const defaultAudio: AudioData = {
  src: '',
  play: {
    mute: false,
    once: false,
    every: {
      sections: 1,
      milliseconds: 1000,
    },
  },
  volume: 1,
}

export const defaultSettings: SettingData = {
  roll: {
    duration: 10,
    landing: 'random',
    delay: 0,
  },
  border: defaultBorder,
  font: 'Arial',
  font_size: defaultFontSize,
  font_weight: 400,
  font_color: '#000',
}
