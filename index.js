export class Roulette {
    #rolling = false;
    #rotation = 0;
    #addtxt = { before: '', after: '' };
    #border = { color: '#808C94', width: 10 };
    last_roll = null;
    min_spins = 5;
    audio_dir = '/sounds/soft_click_1s.wav';
    onstop = function() {};

    constructor(rolls, width = 310, height = 310, shrink = 20) {
        this.#width = width;
        this.#height = height;
        this.#shrink = shrink;
        this.#rolls = rolls;
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

    addRollText(before = '', after = '') {
        this.#addtxt.before = before;
        this.#addtxt.after = after;
        this.draw();
    }

    rollByIndex(index) {
        if(this.#rolling) { return; }

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
            document.getElementById('roulette').style.transform = 'rotate(-'+(rotation%360)+'deg)';
            if(audio_counter >= audio_distance) {
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
    
    roll(result) {
        var indexes = [];
        for (var i = 0; i < this.#rolls.length; i++) {
            if(this.#rolls[i] === result) { indexes.push(i); }
        }
        var random = Math.floor(Math.random() * indexes.length);
        this.rollByIndex(indexes[random]);
    }

    draw() {
        const container = document.getElementById('roulette-container');
        container.replaceChildren();
        const roulette = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
        const down_arrow = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
        roulette.setAttribute('width', this.#width); roulette.setAttribute('height', this.#height);
        down_arrow.setAttribute('width', this.#width); down_arrow.setAttribute('height', this.#height);
        down_arrow.style = "position: absolute; left: 50%; transform: translate(-50%,0); z-index: 1;"
        roulette.id = 'roulette'; down_arrow.id = 'roulette-arrow';
        container.append(roulette); container.append(down_arrow); 

        const sections = this.#rolls.length;
        const svg = d3.select('#roulette');
        const padding = this.#shrink / 2;
        const radius = (Math.min(this.#width, this.#height) - padding*2) / 2;
        const angle = Math.PI * 2 / sections;
        const rotation = 360 / sections;

        // draw the circle
        svg.append('circle')
            .attr('cx', radius + padding)
            .attr('cy', radius + padding)
            .attr('r', radius - this.#border.width / 2)
            .attr('fill', 'none')
            .attr('stroke', this.#border.color)
            .style('stroke-width', this.#border.width);

        // split the circle
        for (var i = 0; i < sections; i++) {
            const lx = radius * Math.sin(angle * i) + padding;
            const ly = radius * -Math.cos(angle * i) + padding;
            svg.append('line')
                .attr('x1', radius + padding).attr('y1', radius + padding)
                .attr('x2', radius + lx).attr('y2', radius + ly)
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

        const p1 = (radius)+',0 ';
        const p2 = (radius+padding*2)+',0 ';
        const p3 = radius+padding+','+this.#shrink*2+' ';
        // draw the arrow
        const arrow_svg = d3.select('#roulette-arrow');
        arrow_svg.append('polygon')
            .attr('points', p1 + p2 + p3)
            .attr('style', 'fill:black; stroke:grey; stroke-width:1');
    }
}
