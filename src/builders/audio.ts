import { AudioData, AudioPlayOptions } from '../utils/construct'

export class AudioBuilder {
  private src: string
  private play: AudioPlayOptions
  private volume: number
  private section_count: number

  constructor(audio: AudioData) {
    this.src = audio.src
    this.volume = audio.volume
    this.play = audio.play
    this.section_count = 0
  }

  public playOnce() {
    if (!this.play.once) return
    const audio = new Audio(this.src)
    audio.volume = this.volume
    audio.play()
  }

  public playOnSection() {
    if (!this.play.every.sections) return
    if (this.section_count >= this.play.every.sections) {
      this.section_count = 0
      return
    }
    this.section_count++
    const audio = new Audio(this.src)
    audio.volume = this.volume
    audio.play()
  }
}
