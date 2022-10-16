import * as d3 from 'd3';

export class Roulette {
    #width = 310; #height = 310; #shrink = 20;
    #rolls = []; #colors = []; #probs = [];
    #rolling = false; #rotation = 0;
    #addtxt = { before: '', after: '' };
    #border = { color: '#808C94', width: 10 };
    #roulette_id = 'roulette';
    #custom_arrow = null;
    last_roll = null;
    min_spins = 5;
    audio_dir = '/sounds/soft_click_1s.wav';
    onstart = function() {};
    onstop = function() {};

    constructor(roulette_id, rolls, colors = [], width = 310, height = 310, shrink = 20) {
        this.roulette_id = roulette_id;
        this.#width = width;
        this.#height = height;
        this.#shrink = shrink;
        this.#rolls = rolls;
        this.#colors = colors;
        this.draw();
    }

    setSize(width, height, shrink = 20) {
        this.#width = width;
        this.#height = height;
        this.#shrink = shrink;
        this.draw();
    }

    setBorder(stroke_color, stroke_width) {
        this.#border.color = stroke_color;
        this.#border.width = stroke_width;
        this.draw();
    }

    setArrow(element) {
        this.#custom_arrow = element;
    }

    setProbabilities(probabilities) {
        if(this.#rolls.length == probabilities.length)
            this.#probs = probabilities;
    }

    setRollText(before = '', after = '') {
        this.#addtxt.before = before;
        this.#addtxt.after = after;
        this.draw();
    }

    rollByIndex(index) {
        if(this.#rolling) { return; }

        this.onstart();
        var self = this;
        this.#rolling = true;
        this.last_roll = this.#rolls[index];

        var rotation = this.#rotation;
        const sections = this.#rolls.length;
        const point = 360 * (index) / (sections) + 360 / sections / 2;
        const sprint = (Math.floor(Math.random() * 4) + this.min_spins) * 360 + point;
        var audio_counter = 0; const audio_distance = 360 / sections;

        var ival = setInterval(function() {
            var slow = Math.min(5, Math.floor((sprint - rotation)/180 * 5));
            var increase = Math.floor((sprint - rotation)/sprint * 10) + slow + 1;
            rotation += increase; audio_counter += increase;
            document.getElementById('roulette-circle').style.transform = 'rotate(-'+(rotation%360)+'deg)';
            if(audio_counter >= audio_distance && self.audio_dir != '') {
                var audio = new Audio(self.audio_dir);
                audio_counter -= audio_distance;
                audio.play();
            }
            if(rotation >= sprint) {
                clearInterval(ival);
                self.#rotation = rotation%360;
                self.#rolling = false;
                self.onstop();
            }
        }, 20);
    }
    
    rollProbabilities(probs = this.#probs) {
        if(probs.length <= 0 || this.#rolls.length != probs.length) { return }

        var counter = 0;
        const total = probs.reduce((a, b) => a + b, 0);
        const random =  Math.floor(Math.random() * total) + 1;

        for (var i = 0; i < probs.length; i++) {
            counter += probs[i];
            if(counter > random) {
                this.rollByIndex(i);
            }
        }
        console.error("error: index not found");
    }
    
    rollRandom() {
        var random = Math.floor(Math.random() * this.#rolls.length);
        this.rollByIndex(random);
    }
    
    roll(result) {
        var indexes = [];
        for (var i = 0; i < this.#rolls.length; i++) {
            if(this.#rolls[i] === result) { indexes.push(i); }
        }
        var random = Math.floor(Math.random() * indexes.length);
        this.rollByIndex(indexes[random]);
    }

    #getSector(r, p, s, i) {
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
        const container = document.getElementById(this.#roulette_id);
        container.replaceChildren();
        const roulette = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
        const down_arrow = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
        roulette.setAttribute('width', this.#width); roulette.setAttribute('height', this.#height);
        down_arrow.setAttribute('width', this.#width); down_arrow.setAttribute('height', this.#height);
        down_arrow.style = "position: absolute; left: 50%; transform: translate(-50%,0); z-index: 1;"
        roulette.id = 'roulette-circle'; down_arrow.id = 'roulette-arrow';
        container.append(roulette); container.append(down_arrow); 

        const sections = this.#rolls.length;
        const svg = d3.select('#roulette-circle');
        const padding = this.#shrink / 2;
        const radius = (Math.min(this.#width, this.#height) - this.#shrink) / 2;
        const angle = Math.PI * 2 / sections;
        const rotation = 360 / sections;

        for (var i = 0; i < sections; i++) {
            var color = this.#colors.length > 0 ? this.#colors[i % this.#colors.length] : '#fff';
            svg.append('path')
                .attr('d', this.#getSector(radius, padding, sections, i))
                .style('fill', color)
                .style('stroke', this.#border.color)
                .style('stroke-width', this.#border.width);

            const degree = rotation * ( i + 0.5 );
            const tx = radius + (radius-radius/3) * Math.sin(angle * (i+0.5)) + padding;
            const ty = radius + (radius-radius/3) * -Math.cos(angle * (i+0.5)) + padding;
            const translate = 'translate('+ tx +','+ ty +')';
            const rotate = 'rotate(' + degree + ')';
            svg.append('text')
                .attr('transform', translate + rotate )
                .attr('text-anchor', 'middle').attr('dominant-baseline', 'middle')
                .text(this.#addtxt.before + this.#rolls[i] + this.#addtxt.after);
        }

        // draw the arrow
        const arrow_svg = d3.select('#roulette-arrow');
        if(this.#custom_arrow === null) {
            const p1 = (radius)+',0 ';
            const p2 = (radius+padding*2)+',0 ';
            const p3 = radius+padding+','+this.#shrink*2+' ';
            arrow_svg.append('polygon')
                .attr('points', p1 + p2 + p3)
                .attr('style', 'fill:black; stroke:grey; stroke-width:1');
        } else {
            container.append(this.#custom_arrow); 
        }
    }
}
