/* @jest-environment jsdom */
/* jslint browser: true */
/* global window */
import {Roulette} from '../dist/index';

jest.useFakeTimers();
window.HTMLMediaElement.prototype.play = () => { /* do nothing */ };

test('rollByIndex test last_roll value', () => {
    const roulette = new Roulette({roulette_id: 'roulette', rolls: [1, 2, 3]});
    roulette.rollByIndex(1);
    jest.advanceTimersByTime(10000);
    expect(roulette.last_roll).toBe(2);
});

test('roll test last_roll value number', () => {
    const roulette = new Roulette({roulette_id: 'roulette', rolls: [1, 2, 3]});
    roulette.roll(1);
    jest.advanceTimersByTime(10000);
    expect(roulette.last_roll).toBe(1);
});

test('roll test last_roll value string', () => {
    const roulette = new Roulette({roulette_id: 'roulette', rolls: ['a', 'b', 'c']});
    roulette.roll('a');
    jest.advanceTimersByTime(10000);
    expect(roulette.last_roll).toBe('a');
});

test('roll test audio directory changed', () => {
    const roulette = new Roulette({roulette_id: 'roulette', rolls: [1, 2, 3]});
    roulette.audio_dir = "random_directory";
    roulette.roll(1);
    jest.advanceTimersByTime(10000);
    expect(roulette.last_roll).toBe(1);
});

test('rollProbabilities test direct input', () => {
    const roulette = new Roulette({roulette_id: 'roulette', rolls: [1, 2, 3]});
    roulette.rollProbabilities([0, 0, 1]);
    jest.advanceTimersByTime(10000);
    expect(roulette.last_roll).toBe(3);
});

test('rollProbabilities test setProbabilities', () => {
    const roulette = new Roulette({roulette_id: 'roulette', rolls: [1, 2, 3]});
    roulette.setProbabilities([0, 0, 1]);
    roulette.rollProbabilities();
    jest.advanceTimersByTime(10000);
    expect(roulette.last_roll).toBe(3);
});

test('rollRandom test', () => {
    const roulette = new Roulette({roulette_id: 'roulette', rolls: [1, 2, 3]});
    roulette.rollRandom();
    jest.advanceTimersByTime(10000);
});

test('test full customization', () => {
    const roulette = new Roulette({
        roulette_id: 'roulette', 
        rolls: [1, 2, 3, 4], 
        colors: ['grey', 'white'], 
        diameter: 320,
        shrink: 25
    });
    roulette.setSize(320, 25);
    roulette.setBorder('#808C99', 15);
    roulette.setArrow('<div></div>');
    roulette.setArrow('default');
    roulette.setProbabilities([1, 1, 0, 2]);
    roulette.setRollText('before', 'after');
    roulette.setRollText('before');
    roulette.setRollText();
    roulette.setTextFont('12px', 200, 'grey');
    roulette.rotateText('top');
    roulette.rotateText('left');
    roulette.rotateText('bottom');
    roulette.rotateText('right');
    roulette.rotateText(120);
    roulette.onstart = () => {};
    roulette.onstop = () => {};
    roulette.rollRandom();
});
