import { BorderData, RollOptions, SettingData } from '../utils/construct'

export class SettingBuilder {
  public roll: RollOptions
  // general overridable options
  public font: string
  public font_size: number
  public font_color: string
  public border: BorderData

  constructor(image: SettingData) {
    this.roll = image.roll
    this.font = image.font
    this.font_size = image.font_size
    this.font_color = image.font_color
    this.border = image.border
  }
}
