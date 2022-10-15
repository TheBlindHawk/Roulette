## A simple roulette library

NPM package installation
```
npm install theblindhawk/roulette
```

## 1.1 Version Updates

1. changes/fix to export method
2. Roulette() now requires the id of the div
3. customizable colors!

## Usage
create an html div with ```id=roulette```
```
<div class="my_class_name" id="roulette"></div>
```

import and set up the roulette using js
```
import { Roulette } from "/js/hawk_roulette.js";

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

**roulette_id**  
type: string  
default: required  
The id of the div element that will contain the roulette.  

**rolls**  
type: array  
default: required  
The values of each section of the roulette.  

**colors**  
type: array  
default: []
The colors of each section of the roulette.  
You can input less colors than the values, to have the same colors alternating.  

**width, height**  
type: numeric  
default: 310  
the width and height of the roulette element  

**shrink**  
type: numeric  
default: 20  
Will shrink the size of the roulette board in comparison to the overall  

## Customization

</br>

### customize the view:

| Function      | Options                | Default        |
| ------------- | ---------------------- | -------------- |
| setSize()     | width, height, *shrink | 310, 310, 20   |
| setBorder()   | color, width           | #808C94, 10    |
| addRollText() | *before, *after        | '', ''         |

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
