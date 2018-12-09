import { Injectable, Optional } from '@angular/core';
import { Random } from './random';
import { Die } from '../die/die';

@Injectable({
	providedIn: 'root',
})

export class ShakerService {
	random: Random;

	constructor(@Optional() seed: number) {
		this.random = new Random(seed);
	}

	chooseDie(dice: Array<Die>): Die {
		let index = this.random.nextInt32([0, dice.length]);

		let chosen = dice[index];

		dice.splice(index, 1);

		return chosen;
	}

	chooseSide(die: Die): string {
		let index = this.random.nextInt32([0, die.sides.length]);

		return die.sides[index];
	}
}