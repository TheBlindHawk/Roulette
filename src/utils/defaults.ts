import { sound_click } from '../resources/sounds'
import { ArrowData, AudioData, BoardData, BorderData, SettingData } from './construct'

export const defaultFontColor = '#000'
export const defaultFont = 'Arial'
export const defaultFontWeight = 400
export const defaultBackground = '#fff'
export const defaultProbability = 1
export const defaultFontSize = 16

export const defaultBorder: BorderData = {
  width: 5,
  color: '#888',
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
  element: 'standard',
  width: 20,
  height: 40,
  padding: 20,
  color: '#000',
  shift: 0,
}

export const defaultAudio: AudioData = {
  src: 'data:audio/wav;base64,' + sound_click,
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
    duration: 5000,
    landing: 'random',
    delay: 0,
  },
  border: defaultBorder,
  font: 'Arial',
  font_size: defaultFontSize,
  font_weight: 400,
  font_color: '#000',
}
