![](https://img.shields.io/npm/dm/@theblindhawk/roulette)
![](https://img.shields.io/npm/v/@theblindhawk/roulette)
![](https://img.shields.io/github/languages/code-size/TheBlindHawk/Roulette)
![](https://img.shields.io/librariesio/release/npm/d3)

## A simple roulette library

NPM package installation
```
npm install theblindhawk/roulette
```
![alt text](https://github.com/TheBlindHawk/Roulette/blob/main/docs/black_white.png?raw=true)
![alt text](https://github.com/TheBlindHawk/Roulette/blob/main/docs/colors.png?raw=true)

## 1.3 Version Updates

1. you can now rotate the text at will!
2. the default "click" sound not playing has been fixed
3. custom arrow svg element has been tested

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
let roulette = new Roulette("roulette", rolls);
// tell the roulette to roll on said option
roulette.roll(8);
```


## Roulette()

```
new Roulette(roulette_id, rolls, colors, diameter, shrink);
```

| Value         | Type     | Default   | comment        |
| ------------- | -------- | --------- | -------------- |
| roulette_id   | string   | required  | The id of the div element that will contain the roulette.  |
| rolls         | array    | required  | The values of each section of the roulette.                |
| colors        | array    | []        | The colors of the sections of the roulette.                |
| diameter      | numeric  | 310       | the width and height of the roulette element               |
| shrink        | numeric  | 20        | Shrinks the size of the board in comparison to the overall |

NB: if the number of colors is less than the rolls they will repeat.

## Customization

</br>

### customize the view:

| Function      | Options                | Default             |
| ------------- | ---------------------- | ------------------- |
| setSize()     | width, height, *shrink | 310, 310, 20        |
| setBorder()   | color, width           | #808C94, 10         |
| setRollText() | *before, *after        | '', ''              |
| rotateText()  | rotation(int/string)   | 'circular-inner'    |
| setTextFont() | size, weight, color    | '16px', 1, '#black' |

</br>

### customize the sound

| Variable      | Comment                            | Default                     |
| ------------- | ---------------------------------- | --------------------------- |
| audio_dir     | the directory of the "click" sound | 'default'                   |

NB: '/path/soundfile.wav' for custom file, 'default' for default sound, '' to remove sound

</br>

### call actions

| Function                 | Comment                                                 |
| ------------------------ | ------------------------------------------------------- |
| roll(value)              | rolls the roulette to an index with said value          |
| rollByIndex(index)       | rolls the roulette to said index                        |
| rollRandom()             | rolls the roulette to a random index                    |
| rollProbabilities(probs) | rolls the roulette using custom probabilities[]         |
| draw()                   | redraws the roulette (probably unnecessary)             |

</br>

## public variables

| Variable      | Type     | Comment                            |
| ------------- | -------- |----------------------------------- |
| last_roll     | numeric  | the last value you rolled on       |
| audio_dir     | string   | the directory of the "click" sound |
| onstart       | function | runs before rolling the roulette   |
| onstop        | function | runs after rolling the roulette    |

## Examples

Here is a fully set up roulette example
```javascript
import { Roulette } from "@theblindhawk/roulette";

const rolls = [0, 8, 3, 5, 50];
const colors = ["#27296a", "#db5a52"];
// svg element width = 500x500, wheel drawing width = 460x460
let roulette = new Roulette("roulette", rolls, colors, 500, 40);
roulette.audio_dir = 'sounds/my_click.wav";

roulette.onstop = function() { console.log(roulette.last_roll) }
roulette.rollRandom();
```

### Roll Probabilities
The probabilities[] array will accept an array the same lenght of the rolls[] containing integers.  
```javascript
const rolls = [0, 8, 3, 5, 50];
// 10% chance for 0/8/3 and 35% chance for 5/50
const probabilities = [10, 10, 10, 35, 35]
let roulette = new Roulette("roulette", rolls);

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

For changing the font of the roulette you just need to change the css of the div containing it.  
```html
<div class="change_font_here" id="roulette"></div>
```
The Roulette will automatically display the values passed in the roll[].  
But if you need to add some text before or after the rolls use the following.  
```javascript
const probabilities = ['first', 'second']
let roulette = new Roulette("roulette", rolls);

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
