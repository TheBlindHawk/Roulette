## A simple roulette library

NPM package installation
```
npm install theblindhawk/roulette
```

## 1.2 Version Updates

1. you can now customize roll probabilities!
2. you can roll on a random number instead of a fixed one
3. addRollText() => setRollText() for better comprehention
4. you can now change the arrow svg with a custom element (beta ver.)

## Usage
create an html div with ```id=roulette```
```
<div class="my_class_name" id="roulette"></div>
```

import and set up the roulette using js
```
import { Roulette } from "@theblindhawk/roulette";

// the array with all the roulette options
const rolls = [0, 8, 3, 5, 50];
var roulette = new Roulette("roulette", rolls);
// tell the roulette to roll on said option
roulette.roll(8);
```


## Roulette()

```
new Roulette(roulette_id, rolls, colors, width, height, shrink)
```

| Value         | Type     | Default   | comment        |
| ------------- | -------- | --------- | -------------- |
| roulette_id   | string   | required  | The id of the div element that will contain the roulette.  |
| rolls         | array    | required  | The values of each section of the roulette.                |
| colors        | array    | []        | The colors of the sections of the roulette.                |
| width, height | numeric  | 310       | the width and height of the roulette element               |
| shrink        | numeric  | 20        | Shrinks the size of the board in comparison to the overall |

NB: if the number of colors is less than the rolls they will repeat.

## Customization

</br>

### customize the view:

| Function      | Options                | Default        |
| ------------- | ---------------------- | -------------- |
| setSize()     | width, height, *shrink | 310, 310, 20   |
| setBorder()   | color, width           | #808C94, 10    |
| setRollText() | *before, *after        | '', ''         |

</br>

### customize the sound

| Variable      | Comment                            | Default                     |
| ------------- | ---------------------------------- | --------------------------- |
| audio_dir     | the directory of the "click" sound | '/sounds/soft_click_1s.wav' |

to activate the default sound run:
```
cp node_modules/packagename/sounds/soft_click_1s.wav public/sounds
```
and set the audio_dir like so:
```
roulette.audio_dir = '/sounds/soft_click_1s.wav'
```
NB: this example is using Laravel, other frameworks may change slightly.

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
