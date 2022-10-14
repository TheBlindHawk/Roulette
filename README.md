## A simple roulette library

NPM package installation
```
npm install theblindhawk/roulette
```

## Usage
create an html div with ```id=roulette-container```
```
<div class="my_class_name" id="roulette-container"></div>
```

import and set up the roulette using js
```
import { Roulette } from "/js/hawk_roulette.js";

// the array with all the roulette options
const rolls = [0, 8, 3, 5, 50];
var roulette = new Roulette(rolls);
// tell the roulette to roll on said option
roulette.roll(8);
```

## Customization

</br>

### customize the view:

| Function      | Options                | Default        |
| ------------- | ---------------------- | -------------- |
| setSize()     | width, height, *shrink | 310, 310, 20   |
| setBorder()   | color, width           | #808C94, 10    |
| addRollText() | *before, *after        | '', ''         |

NB: shrink will shrink the roulette circle drawing compared to the overall

</br>

### customize the sound

| Variable      | Comment                            | Default                     |
| ------------- | ---------------------------------- | --------------------------- |
| audio_dir     | the directory of the "click" sound | '/sounds/soft_click_1s.wav' |

</br>

### call actions

| Function      | Comment                                           |
| ------------- | ------------------------------------------------- |
| roll()        | rolls the roulette to an index with said value    |
| rollByIndex() | rolls the roulette to said index                  |
| draw()        | redraws the roulette (probably unnecessary)       |

</br>

## public variables

| Variable      | Comment                            |
| ------------- | ---------------------------------- |
| last_roll     | the last value you rolled on       |
| audio_dir     | the directory of the "click" sound |
