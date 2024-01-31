<h1 align="center">Customizable Roulette Library</h1>

<div align="center">
    
![](https://img.shields.io/npm/v/@theblindhawk/roulette)
![](https://img.shields.io/npm/dm/@theblindhawk/roulette)
![](https://img.shields.io/github/languages/code-size/TheBlindHawk/Roulette)

</div>

```
npm install @theblindhawk/roulette
```

<div align="center">

![alt text](https://github.com/TheBlindHawk/Roulette/blob/main/docs/sample_1.png?raw=true)
![alt text](https://github.com/TheBlindHawk/Roulette/blob/main/docs/sample_2.png?raw=true)

</div>

## v3.0 Features

- **Compatible** with Javascript, TypeScript, React, Vue
- **Customize** the view of the Roulette down to the details
- **Customize** the click sound, the spin duration and more
- **Control** the value the Roulette will land at
- **Import** any of your own roulette or arrow **images**
- **Does not** require any external dependencies
- **Test it** out by running "npm run dev" after cloning

NB: check out the change log to see what changed from version 2!
(change log is currently Work In Progress)

## Planned Features

- A casino shaped Roulette to be added as one of the defaults

## Table of Contents
- [Features](#features)
- [Planned Features](#planned-features)
- [Table of Contents](#table-of-contents)
- [Usage](#usage)
- [Roulette](#roulette)
  - [ArrowData](#arrow-arrowdata)
  - [TextData](#text-textdata)
  - [AudioData](#audio-audiodata)
- [Roll Options](#roll-options)
- [Variables](#variables)
- [Examples](#examples)

## Usage
import and set up the roulette using js
```javascript
import { Roulette } from "@theblindhawk/roulette";

const container = document.querySelector('.wheel-container')
const sections = [0, 8, 3, 5, 50];
let roulette = new Roulette({container, sections});
// tell the roulette to roll on said option
const result = roulette.roll();
```
the container variable can either be:
1. the HTMLElement where the roulette will be placed
2. the id of the Element where the roulette will e placed

## Roulette

```typescript
interface Roulette = {
  container: string | HTMLElement
  sections: SectionData[]
  colors: string[]
  board: BoardData
  arrow: ArrowData
  settings: SettingData
  audio: AudioData
};
```

| Value         | Type                 | Default   | Comment        |
| ------------- | -------------------- | --------- | -------------- |
| container     | string / HTMLElement | required  | The id or the element that will contain the roulette  |
| sections      | SectionData[]        | required  | The values of each section of the roulette            |
| colors        | string[]             | ['#fff']  | A list of (repeating) colors for the sections         |
| board         | BoardData            | { ... }   | Customization for the roulette board                  |
| arrow         | ArrowData            | { ... }   | Customization for the roulette arrow                  |
| settings      | SettingData          | { ... }   | More settings such as fonts, colors, borders          |
| audio         | AudioData            | { ... }   | Set up when the audio plays and its directory         |

NB: if the number of colors is less than the rolls they will repeat.

### Section

```typescript
type Alphanumeric = number | string
type Customized = {
  background: string
  probability: number
  value: string
  font: string
  font_size: number
  font_color: string
}
type ImageSrc ={
  background: string
  probability: number
  value: string
  src: string
  radius: number
}
interface SectionData = 
  | Alphanumeric
  | Customized
  | ImageSrc
```
examples
```typescript
const sections = ["eat", "sleep", "drink"];
const sections = [{value: "eat", background: "green"}, {value: "drink", background: "blue"}]
const sections = [{src: "http://", radius: 10}, {src: "http://", radius: 10}]
```

### Board

```typescript
interface BoardData = {
  element: string | HTMLElement
  doughnut: { radius: number; color: string }
  shift: number
  border: BorderData
  radius: number
  padding: number
}
```

| Value         | Type                 | Default   | Comment        |
| ------------- | -------------------- | --------- | -------------- |
| element       | string / HTMLElement | undefined | the board as an html string or as an element            |
| doughnut      | { radius, color }    | undefined | the size of the hole at the center of the roulette      |
| shift         | number               | 0         | shift the starting point of "shift" degrees clockwise   |
| border        | BorderData           | { ... }   | the color, width andother border related settings       |
| radius        | number               | 120       | the radius of the roulette board                        |
| padding       | number               | 20        | the padding from the container                          |

NB: board width & height is calculated as such: ```width = (radius - padding) * 2```

### Arrow

```typescript
interface ArrowData = {
  element: string | HTMLElement
  shift: ShiftOptions
  width: number
  height: number
  padding: number
  color: string
};
```

| Value         | Type                 | Default    | Comment        |
| ------------- | -------------------- | ---------- | -------------- |
| element       | string / HTMLElement | 'standard' | the arrow as an html string or as an element  |
| shift         | number               | 0          | rotate the arrow "shift" degrees clockwise    |
| width         | number               | 60         | the width of the arrow element in pixels      |
| height        | number               | 60         | the heght of the arrow element in pixels      |
| padding       | number               | 20         | the arrow's distance from the top             |

NB: there are currently three ready made arrow svgs: 'standard', 'thin', 'sharp'.

### Settings

```typescript
interface Settings = {
  roll: {
    duration: number
    landing: LandingTypes
    delay: number
  }
  // general overridable options
  font: string
  font_size: number
  font_weight: number
  font_color: string
  border: BorderData
};
```

NB: setting options are overridable on each SectionData

| Value         | Type            | Default    | Comment        |
| ------------- | --------------- | ---------- | -------------- |
| font          | string          | { ... }    | The font size/weight/color of the roulette text  |
| before        | string          | ''         | Add some text before the rolls[] values          |
| after         | string          | ''         | Add some text after the rolls[] values           |
| rotate        | number / string | 0          | rotate the text to face a different direction    |

### AudioData

```typescript
interface AudioData = {
  src: string
  volume: number
  play: {
    once: boolean
    every: {
        milliseconds: number
        sections: number
    }
    mute: boolean
  }
},
```

## Customization

</br>

## Functions

</br>

### roll options

| Function                 | Comment                                                 |
| ------------------------ | ------------------------------------------------------- |
| roll(value)              | rolls the roulette to an index with said value          |
| rollByIndex(index)       | rolls the roulette to said index                        |
| rollProbabilities(probs) | rolls the roulette using custom probabilities[]         |

</br>

## Variables

</br>

| Variable      | Type     | Comment                            |
| ------------- | -------- |----------------------------------- |
| onstart       | function | runs before rolling the roulette   |
| onstop        | function | runs when roulette stops rolling   |

</br>

## Examples (Work In Progess...)
