module.exports = class Roulette {
    #rolling = false;
    rotation = 0;
    min_spins = 5;
    stroke_color = '#808C94';
    stroke_width = 10;
    roulette_id = 'roulette';
    arrow_size = 60;
    onstop = function() {};

    constructor(rolls, width = 310, height = 310) {
        this.width = width;
        this.height = height;
        this.rolls = rolls;
        this.draw();
    }

    rollByIndex(index) {
        if(this.#rolling) { return; }

        var self = this;
        this.#rolling = true;

        var rotation = this.rotation;
        const sections = this.rolls.length;
        const point = 360 * (index) / (sections) + 360 / sections / 2;
        const sprint = (Math.floor(Math.random() * 4) + this.min_spins) * 360 + point;
        var audio_counter = 0; const audio_distance = 360 / sections;

        var ival = setInterval(function() {
            var slow = Math.min(5, Math.floor((sprint - rotation)/180 * 5));
            var increase = Math.floor((sprint - rotation)/sprint * 10) + slow + 1;
            rotation += increase; audio_counter += increase;
            document.getElementById(this.roulette_id).style.transform = 'rotate(-'+(rotation%360)+'deg)';
            if(audio_counter >= audio_distance) {
                var audio = new Audio('/sounds/soft_click_1s.wav');
                audio_counter -= audio_distance;
                audio.play();
            }
            if(rotation >= sprint) {
                clearInterval(ival);
                self.rotation = rotation%360;
                self.#rolling = false;
                self.onstop();
            }
        }, 20);
    }
    
    roll(result) {
        var indexes = [];
        for (i = 0; i < rolls.length; i++) {
            if(rolls[i] === result) { indexes.push(i); }
        }
        shuffle(indexes)
        this.rollByIndex(indexes[0]);
    }

    draw() {
        const sections = this.rolls.length;
        const svg = d3.select('#'+this.roulette_id);
        const radius = (Math.min(this.width, this.height) - this.arrow_size) / 2;
        const angle = Math.PI * 2 / sections;
        const rotation = 360 / sections;

        svg.selectAll("*").remove();

        // draw the circle
        svg.append('circle')
            .attr('cx', radius).attr('cy', radius)
            .attr('r', radius - this.stroke_width / 2)
            .attr('stroke', this.stroke_color)
            .style('stroke-width', this.stroke_width);

        // split the circle
        for (i = 0; i < sections; i++) {
            const lx = radius * Math.sin(angle * i);
            const ly = radius * -Math.cos(angle * i);
            svg.append('line')
                .attr('x1', radius).attr('y1', radius)
                .attr('x2', radius + lx).attr('y2', radius + ly)
                .style('stroke', this.stroke_color)
                .style('stroke-width', this.stroke_width);

            const degree = rotation * ( i + 0.5 );
            const tx = radius + (radius-radius/3) * Math.sin(angle * (i+0.5));
            const ty = radius + (radius-radius/3) * -Math.cos(angle * (i+0.5));
            const translate = 'translate('+ tx +','+ ty +')';
            const rotate = 'rotate(' + degree + ')';
            svg.append('text')
                .attr('transform', translate + rotate )
                .attr('text-anchor', 'middle').attr('dominant-baseline', 'middle')
                .text(this.rolls[i]);
        }

        p1 = (radius-this.arrow_size/4)+',0 ';
        p2 = (radius+this.arrow_size/4)+',0 ';
        p3 = radius+','+this.arrow_size+' ';
        // draw the arrow
        svg.append('polygon')
            .attr('points', p1 + p2 + p3)
            .attr('style', 'fill:black; stroke:grey; stroke-width:1');
    }
}
