import { Injectable } from '@angular/core';
import { Random } from './random';
import { Die } from '../die/die';

@Injectable()
export class ShakerService {
	private random: Random;

	constructor(seed?: number) {
		this.random = new Random(seed);
	}

	chooseDie(dice: Array<Die>): Die {
		let index = this.random.nextInt32([0, dice.length]);
		let die = dice[index];
		dice.splice(index, 1);
		return die;
	}

	chooseSide(die: Die): string {
		let index = this.random.nextInt32([0, die.sides.length]);
		return die.sides[index];
	}
}