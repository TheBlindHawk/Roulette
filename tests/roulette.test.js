/* eslint-disable */
import {Roulette} from '../dist/index.js';

test('adds 1 + 2 to equal 3', () => {
    const roulette = new Roulette({roulette_id: 'roulette', rolls: [1, 2, 3]});
    expect(1+2).toBe(3);
});
