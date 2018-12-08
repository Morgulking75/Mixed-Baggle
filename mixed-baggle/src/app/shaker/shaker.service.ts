import { Injectable } from '@angular/core';
import { Random } from './random';

@Injectable({
	providedIn: 'root',
})

export class ShakerService {
	random: Random;

	constructor(seed: number) {
		this.random = new Random(seed);
	}

	chooseDie(dice: Array<Die>) {
		let index = this.random.nextInt32([0, dice.length]);

		return dice[index];
	}

	chooseSide(die: Die) {
		let index = this.random.nextInt32([0, die.sides.length]);

		return die.sides[index];
	}
}