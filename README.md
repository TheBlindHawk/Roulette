<h1 align="center">Customizable Roulette Library</h1>

<div align="center">
    
![](https://img.shields.io/npm/dm/@theblindhawk/roulette)
![](https://img.shields.io/npm/v/@theblindhawk/roulette)
![](https://img.shields.io/github/languages/code-size/TheBlindHawk/Roulette)
![](https://img.shields.io/librariesio/release/npm/d3)

</div>

```
npm install @theblindhawk/roulette
```

<div align="center">

![alt text](https://github.com/TheBlindHawk/Roulette/blob/main/docs/sample_1.png?raw=true)
![alt text](https://github.com/TheBlindHawk/Roulette/blob/main/docs/sample_2.png?raw=true)

</div>

## Breaking Changes

**V 2.1.0** Use the contructor to change the audio directory (audio_dir has been removed)  
**V 2.1.0** roulette functions will now thow an error when receiving unprocessable data  

## Features

- **Compatible** with both Javascript and TypeScript
- **Customize** the view of the Roulette down to the details
- **Customize** the click sound and the spin duration
- **Control** the value the Roulette will land at
- **Import** any of your own roulette or arrow **images**

## Planned Features

- A casino shaped Roulette to be added as one of the defaults

## Table of Contents
- [Usage](#usage)
  - [Standard Roulette](#roulette)
  - [Doughnut Roulette](#doughnut-roulette)
  - [Image Roulette](#image-roulette)
- [Customization](#customization)
- [Call Actions](#actions)
- [Public Variables](#variables)
- [More Examples](#examples)

## Usage
create an html div with ```id=roulette```
```html
<div class="my_class_name" id="roulette"></div>
```

import and set up the roulette using js
```javascript
import { Roulette } from "@theblindhawk/roulette";

// the array with all the roulette options
const rolls = [0, 8, 3, 5, 50];
let roulette = new Roulette({id: "roulette", rolls: rolls});
// tell the roulette to roll on said option
roulette.roll(8);
```

## Roulette

```typescript
interface Roulette = {
    id: string,
    rolls: number[] | string[],
    colors?: string[],
    duration?: number,
    arrow?: ArrowData,
    landing?: 'precise' | 'loose',
    text?: TextData,
    audio?: AudioData,
    rotate?: number,
    diameter?: number,
    shrink?: number
};
```

| Value         | Type     | Default   | Comment        |
| ------------- | -------- | --------- | -------------- |
| id            | string   | required  | The id of the div element that will contain the roulette.  |
| rolls         | array    | required  | The values of each section of the roulette.                |
| colors        | array    | []        | The colors of the sections of the roulette.                |
| duration      | number   | 10000     | How long you want the roulette to spin in milliseconds     |
| arrow         | Arrow    | { ... }   | The design and size of the arrow if you wish to change it  |
| landing       | Landing  | 'loose'   | You can land at the center of the roll or randomly         |
| audio         | object   | { ... }   | Set up when the audio plays and its directory              |
| text          | object   | { ... }   | The text data, such as fonts and rotation                  |
| rotate        | number   | 0         | Initially rotate the roulette to a different degree        |
| diameter      | number   | 310       | the width and height of the roulette element               |
| shrink        | number   | 20        | Shrinks the size of the board in comparison to the overall |

NB: if the number of colors is less than the rolls they will repeat.

#### arrow: ArrowData

```typescript
interface ArrowData = {
    element?: string / HTMLElement,
    width?: number,
    fill?: string,
    rotate?: number,
};
```

| Value         | Type                 | Default    | Comment        |
| ------------- | -------------------- | ---------- | -------------- |
| element       | string / HTMLElement | 'standard' | the arrow as an html string or as an element  |
| width         | number               | 60         | the width of the arrow element in pixels      |
| fill          | string               | 'black'    | the color of arrow (if the element is an svg) |
| rotate        | number               | 0          | rotate the arrow to a different position      |

NB: there are currently three ready made arrow svgs: 'standard', 'thin', 'sharp'.

#### text: TextData

```typescript
interface TextData = {
    font?: {
        size?: number,
        weight?: number,
        color?: string,
    },
    before?: string,
    after?: string,
    rotate?: number
};
```

| Value         | Type            | Default    | Comment        |
| ------------- | --------------- | ---------- | -------------- |
| font          | object          | { ... }    | The font size/weight/color of the roulette text  |
| before        | string          | ''         | Add some text before the rolls[] values          |
| after         | string          | ''         | Add some text after the rolls[] values           |
| rotate        | number / string | 0          | rotate the text to face a different direction    |

#### audio: AudioData

```typescript
interface AudioData = {
    play?: 'once' | 'multiple',
    dir?: string
},
```

| Value         | Type            | Default    | Comment        |
| ------------- | --------------- | ---------- | -------------- |
| play          | string          | 'multiple' | If the sound should play on each segment or only once  |
| dir           | string          | 'default'  | The directory of the sound. Pass '' to mute it         |

### Doughnut Roulette

```typescript
interface Doughnut = {
    ...
    type: 'doughnut',
    doughnut: {
        diameter: number,
        fill: string,
    }
};
```

| Value        | Type   | Default  | Comment        |
| ------------ | ------ | -------- | -------------- |
| diameter     | number | required | size of the hole in the doughnut  |
| fill         | string | 'white'  | color of the hole in the doughnut |

### Image Roulette

```typescript
interface Custom = {
    ...
    type: 'image',
    image: {
        src: string,
        angle: number
    }
};
```

| Value        | Type   | Default  | Comment        |
| ------------ | ------ | -------- | -------------- |
| src          | string | required | The url of the custom roulette image                |
| angle        | number | 0        | Rotate the image without changing the initial point |


## Customization

</br>

### customize the view:

| Function      | Options                | Default             |
| ------------- | ---------------------- | ------------------- |
| setSize()     | width, height, shrink  | 310, 310, 20        |
| setBorder()   | color, width           | #808C94, 10         |
| setRollText() | before, after          | '', ''              |
| rotateText()  | rotation(int/string)   | 'circular-inner'    |
| setTextFont() | size, weight, color    | '16px', 1, '#black' |
| setDuration() | milliseconds           | 10000               |

</br>

### customize the sound

| Variable      | Comment                            | Default                     |
| ------------- | ---------------------------------- | --------------------------- |
| audio_dir     | the directory of the "click" sound | 'default'                   |

NB: '/path/soundfile.wav' for custom file, 'default' for default sound, '' to remove sound

</br>

## Actions

| Function                 | Comment                                                 |
| ------------------------ | ------------------------------------------------------- |
| roll(value)              | rolls the roulette to an index with said value          |
| rollByIndex(index)       | rolls the roulette to said index                        |
| rollRandom()             | rolls the roulette to a random index                    |
| rollProbabilities(probs) | rolls the roulette using custom probabilities[]         |
| draw()                   | redraws the roulette (probably unnecessary)             |

</br>

## Variables

| Variable      | Type     | Comment                            |
| ------------- | -------- |----------------------------------- |
| last_roll     | numeric  | the last value you rolled on       |
| audio_dir     | string   | the directory of the "click" sound |
| onstart       | function | runs before rolling the roulette   |
| onstop        | function | runs after rolling the roulette    |

## Examples

Here is a fully customized standard roulette example
```javascript
import { Roulette } from "@theblindhawk/roulette";

const rolls = [0, 8, 3, 5, 50];
const colors = ["#27296a", "#db5a52"];
// svg element width = 500x500, wheel drawing width = 460x460
const roulette = new Roulette({
    id: "roulette",
    rolls: rolls,
    colors: colors,
    duration: 5000,
    arrow: {
        width: 80,
        fill: 'grey'
    },
    landing: 'precise',
    diameter: 500,
    shrink: 40
});
roulette.audio_dir = 'sounds/my_click.wav';

roulette.onstop = function(last_roll) { console.log(last_roll) }
roulette.rollRandom();
```

### Roll Probabilities
The probabilities[] array will accept an array the same lenght of the rolls[] containing integers.  
```javascript
const rolls = [0, 8, 3, 5, 50];
// 10% chance for 0/8/3 and 35% chance for 5/50
const probabilities = [10, 10, 10, 35, 35]
const roulette = new Roulette({id: "roulette", rolls: rolls});

roulette.setProbabilities(probabilities);
roulette.rollProbabilities();
```
You can also shorten the syntax by directly handing the probabilities to the roll statement  
```javascript
// use previously passed probabilities
roulette.setProbabilities(probabilities);
roulette.rollProbabilities();

// directly hand probabilities when rolling
roulette.rollProbabilities(probabilities);
```
Any values, so long as they are an array of integers can be passed as probabilities.  
The following examples will all have 3 choices with 25%/25%/50% probabilities.  
```javascript
// these will all result in the same probabilities
roulette.rollProbabilities([ 25, 25, 50 ]);
roulette.rollProbabilities([ 1, 1, 2 ]);
roulette.rollProbabilities([ 36, 36, 72 ]);
```

### Edit Roll Text

For changing the font of the roulette you can either change the font of the container or rely on ```setTextFont()```.
```html
<div class="change_font_here" id="roulette"></div>
```
```javascript
roulette.setRollText(20, 600, 'grey');
```
The Roulette will automatically display the values passed in the roll[].  
But if you need to add some text before or after the rolls use the following.  
```javascript
const probabilities = ['first', 'second'];
const roulette = new Roulette({id: "roulette", rolls: rolls});

// roll 1: 'the first value'
// roll 2: 'the second value'
roulette.setRollText('the ', ' value');
```
If you wish to rotate the text somehow use the following.  
```javascript
// the text is"straight" on the right side
roulette.rotateText('sideways-right');
// the same but using an integer for it
roulette.rotateText(270);
```
