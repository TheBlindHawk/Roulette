import { select, Selection } from 'd3-selection';
import { sound_click } from './sounds/sounds.js';

type Construct = { roulette_id: string, rolls: number[] | string[], colors: string[], diameter: number, shrink: number };
type Font = { size: string, weight: number, color: string };
type Rotation = number | "circular-inner" | "sideways-left" | "circular-outer" | "sideways-right";

export class Roulette {
    #roulette_id: string;
    #diameter: number; #shrink: number;
    #rolls: number[] | string[]; #colors: string[]; #probs!: number[];
    #rolling = false; #rotation = 0; #text_rotation = 0;
    #addtxt: {before: string, after: string} = { before: '', after: '' };
    #border: {color: string, width: number} = { color: '#808C94', width: 10 };
    #custom_arrow: Element | null = null;
    #svg!: Selection<SVGSVGElement, unknown, HTMLElement, any>;
    #arrow!: Selection<SVGSVGElement, unknown, HTMLElement, any>;
    #font: Font = { size: '16px', weight: 1, color: 'black'}
    last_roll!: string | number; min_spins = 5; audio_dir = 'default';
    onstart = function() {};
    onstop = function() {};

    constructor({roulette_id, rolls, colors = [], diameter = 310, shrink = 20}: Construct) {
        this.#roulette_id = roulette_id;
        this.#rolls = rolls;
        this.#colors = colors;
        this.#diameter = diameter;
        this.#shrink = shrink;
        this.draw();
    }

    setSize(diameter: number,  shrink: number) {
        this.#diameter = diameter;
        this.#shrink = shrink;
        this.draw();
    }

    setBorder(stroke_color: string, stroke_width: number) {
        this.#border.color = stroke_color;
        this.#border.width = stroke_width;
        this.draw();
    }

    setArrow(element: Element) {
        this.#custom_arrow = element;
        this.draw();
    }

    setProbabilities(probabilities: number[]) {
        if(this.#rolls.length == probabilities.length)
            this.#probs = probabilities;
    }

    setRollText(before = '', after = '') {
        this.#addtxt.before = before;
        this.#addtxt.after = after;
        this.draw();
    }

    setTextFont({size, weight, color}: Font) {
        this.#font = {size: size, weight: weight, color: color}
        this.draw();
    }

    rotateText(rotation: Rotation) {
        switch (rotation) {
            case "circular-inner":
                this.#text_rotation = 0;
                break;
            case "sideways-left":
                this.#text_rotation = 90;
                break;
            case "circular-outer":
                this.#text_rotation = 180;
                break;
            case "sideways-right":
                this.#text_rotation = 270;
                break;
            default:
                this.#text_rotation = rotation;
                break;
        }
        this.draw();
    }

    rollByIndex(index: number) {
        if(this.#rolling) { return; }

        this.onstart();
        this.#rolling = true;
        this.last_roll = this.#rolls[index];

        let rotation = this.#rotation;
        const sections = this.#rolls.length;
        const point = 360 * (index) / (sections) + 360 / sections / 2;
        const sprint = (Math.floor(Math.random() * 4) + this.min_spins) * 360 + point;
        let audio_counter = 0; const audio_distance = 360 / sections;

        const ival = setInterval(() => {
            const slow = Math.min(5, Math.floor((sprint - rotation)/180 * 5));
            const increase = Math.floor((sprint - rotation)/sprint * 10) + slow + 1;
            rotation += increase; audio_counter += increase;
            this.#svg?.style('transform', 'rotate(-'+(rotation%360)+'deg)');
            if(audio_counter >= audio_distance && this.audio_dir != '') {
                if(this.audio_dir == 'default') {
                    const audio = new Audio("data:audio/wav;base64," + sound_click);
                    audio_counter -= audio_distance;
                    audio.play();
                } else {
                    const audio = new Audio(this.audio_dir);
                    audio_counter -= audio_distance;
                    audio.play();
                }
            }
            if(rotation >= sprint) {
                clearInterval(ival);
                this.#rotation = rotation%360;
                this.#rolling = false;
                this.onstop();
            }
        }, 20);
    }
    
    rollProbabilities(probs: number[] = this.#probs) {
        if(probs.length <= 0 || this.#rolls.length != probs.length) { return }

        let counter = 0;
        const total = probs.reduce((a, b) => a + b, 0);
        const random =  Math.floor(Math.random() * total) + 1;

        for (let i = 0; i < probs.length; i++) {
            counter += probs[i];
            if(counter > random) {
                this.rollByIndex(i);
            }
        }
        console.error("error: index not found");
    }
    
    rollRandom() {
        const random = Math.floor(Math.random() * this.#rolls.length);
        this.rollByIndex(random);
    }
    
    roll(result: string | number) {
        const indexes: number[] = [];
        for (let i = 0; i < this.#rolls.length; i++) {
            if(this.#rolls[i] === result) { indexes.push(i); }
        }
        const random = Math.floor(Math.random() * indexes.length);
        this.rollByIndex(indexes[random]);
    }

    #getSector(r: number, p: number, s: number, i: number) {
        const a1 = 360 / s * i - 90;
        const a2 = 360 / s * (i + 1) - 90;
        const degtorad = Math.PI / 180;
        const cx1 = Math.cos(degtorad * a1) * r + r + p;
        const cy1 = Math.sin(degtorad * a1) * r + r + p;
        const cx2 = Math.cos(degtorad * a2) * r + r + p;
        const cy2 = Math.sin(degtorad * a2) * r + r + p;

        return `M${r+p} ${r+p} ${cx1} ${cy1} A${r} ${r} 0 0 1 ${cx2} ${cy2}Z`;
    };

    draw() {
        const container = select('#' + this.#roulette_id)
                .style('position','relative').style('display', 'flex');
        this.#svg = container.append('svg').attr('id', 'roulette-circle')
                .attr('width', this.#diameter).attr('height', this.#diameter);
        this.#arrow = container.append('svg').attr('id', 'roulette-arrow')
                .style('position', 'absolute').style('z-index', 1);

        const sections = this.#rolls.length;
        const padding = this.#shrink / 2;
        const radius = (this.#diameter - this.#shrink) / 2;
        const angle = Math.PI * 2 / sections;
        const rotation = 360 / sections;
        this.#svg.style('font-size', this.#font.size);
        this.#svg.style('font-weight', this.#font.weight);

        for (let i = 0; i < sections; i++) {
            const color = this.#colors.length > 0 ? this.#colors[i % this.#colors.length] : '#fff';
            this.#svg.append('path')
                .attr('d', this.#getSector(radius, padding, sections, i))
                .style('fill', color)
                .style('stroke', this.#border.color)
                .style('stroke-width', this.#border.width);

            const degree = rotation * ( i + 0.5 ) + this.#text_rotation;
            const tx = radius + (radius-radius/3) * Math.sin(angle * (i+0.5)) + padding;
            const ty = radius + (radius-radius/3) * -Math.cos(angle * (i+0.5)) + padding;
            const translate = 'translate('+ tx +','+ ty +')';
            const rotate = 'rotate(' + degree + ')';
            this.#svg.append('text')
                .style('fill', this.#font.color)
                .attr('transform', translate + rotate )
                .attr('text-anchor', 'middle').attr('dominant-baseline', 'middle')
                .text(this.#addtxt.before + this.#rolls[i] + this.#addtxt.after);
        }

        // draw the arrow
        if(this.#custom_arrow === null) {
            const p1 = (radius)+',0 ';
            const p2 = (radius+padding*2)+',0 ';
            const p3 = radius+padding+','+this.#shrink*2+' ';
            this.#arrow.append('polygon')
                .attr('points', p1 + p2 + p3)
                .attr('style', 'fill:black; stroke:grey; stroke-width:1');
        } else {
            // container.append(this.#custom_arrow); 
        }
    }
}
