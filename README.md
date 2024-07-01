> [!IMPORTANT]  
> As of July 1st **@theblindhawk/roulette** has been renamed into **roulette-spinner** therefore marked as deprecated (the github repository will stay the same).  
> The following changes will be applied on the new package:  
> 1. the license will be changed from ISC to MIT for convenience
> 2. a few keywords such as "roll" will be changing into "spin"
> 3. Vue and React utilities will be coming in the form of new packages (roulette-spinner-react and roulette-spinner-vue)  
>
> Apologies for the inconvenience!

<h1 align="center">Customizable Roulette Library</h1>

<div align="center">
    
![](https://img.shields.io/npm/v/@theblindhawk/roulette)
![](https://img.shields.io/npm/dm/@theblindhawk/roulette)
![](https://img.shields.io/github/languages/code-size/TheBlindHawk/Roulette)
[![Node.js CI](https://github.com/TheBlindHawk/Roulette/actions/workflows/node.js.yml/badge.svg)](https://github.com/TheBlindHawk/Roulette/actions/workflows/node.js.yml)

</div>

for the updated version check out the [roulette-spinner](https://www.npmjs.com/package/roulette-spinner) library.

```
npm install @theblindhawk/roulette
```

<div align="center">

![alt text](https://github.com/TheBlindHawk/Roulette/blob/main/docs/sample_1.png?raw=true)
![alt text](https://github.com/TheBlindHawk/Roulette/blob/main/docs/sample_2.png?raw=true)

</div>

## v3.0 Features

- **Compatible** with Javascript, TypeScript
- **Customize** the view of the Roulette down to the details
- **Customize** the click sound, the spin duration and more
- **Control** the value the Roulette will land at
- **Import** any of your own roulette or arrow **images**
- **Does not** require any external dependencies
- **Test it** out by running "npm run dev" after cloning

NB: check out the [change log](https://github.com/TheBlindHawk/Roulette/releases/tag/v%2F3.0.0) to see what changed from version 2!

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

| Function                  | Comment                                                       |
| ------------------------- | ------------------------------------------------------------- |
| roll(value)               | rolls the roulette to an index with said value                |
| rollByIndex(index)        | rolls the roulette to said index                              |
| rollProbabilities(probs)  | rolls the roulette using custom probabilities[]               |
| asyncRollByIndex(promise) | rolls the roulette while waiting for the value in the promise |

**asyncRoll example**

```typescript
const { promise, resolve, reject } = Promise.withResolvers()

roulette.asyncRollByIndex(promise)

// keeps rolling while waiting for the value
axios.get('your_path').then((res) => {
  resolve(res.data.rollIndex)
}).catch((error) => {
  reject(error)
})
```

</br>

## Variables

</br>

| Variable      | Type     | Comment                            |
| ------------- | -------- |----------------------------------- |
| onstart       | function | runs before rolling the roulette   |
| onstop        | function | runs when roulette stops rolling   |

</br>

## Examples

To try out the code clone the repository then run:
```
npm install
npm run dev
```
Then navigate to ```http://localhost:5173/```, there will be three examples available.

If you want to try your own code/settings edit the file ```index.html``` and the changes will be reflected immedeately!

Here is an example of a fully set up Roulette:

```typescript
const img = new Image()
img.src = 'https://link_to_my_board_image.png'

const roulette = new Roulette({
  container: 'roulette',
  board: {
    element: img,
    doughnut: { radius: 10, color: 'white' },
    shift: 10, // degrees
    border: {
      width: 4,
      color: 'grey',
    },
    radius: 120,
    padding: 20,
  },
  arrow: {
    element: 'standard',
    width: 20,
    height: 40,
    padding: 20,
    color: '#000',
    shift: 0,
  },
  sections: [{
    value: 'fail',
    probability: 7,
    font: 'Arial',
    font_size: 12,
    font_color: 'red',
    radius: 50
  }, {
    value: 'grey car',
    probability: 1,
    src: 'https://link_to_some_image.svg',
    radius: 50
  }, {
    value: 'blue car',
    probability: 1,
    src: 'https://link_to_some_image.svg',
    radius: 50
  }, {
    value: 'red car',
    probability: 1,
    src: 'https://link_to_some_image.svg',
    radius: 50
  }],
  settings: {
    roll: {
      duration: 10000, // milliseconds
      landing: 'edge',
      delay: 0, // WIP
    },
    font: 'Arial',
    font_size: 12,
    font_color: 'black',
    border: {
      width: 4,
      color: 'grey',
    },
  },
  colors: [ 'yellow', 'white', 'white', 'white' ],
  audio: {
    src: 'https://link_to_some_audio'
    volume: 1,
    play: { once: true },
  },
});
```

You can then roll the roulette like so.

```typescript
roulette.roll() // to a random value given equal probabilities
roulette.rollIndex(2) // to the grey car
roulette.rollProbabilities() // using the probabilities given in the costructor
```