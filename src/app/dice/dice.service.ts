import { Injectable } from '@angular/core';
import { DiceCollection } from './diceCollection';
import data from './dice.json';

@Injectable({
	providedIn: 'root',
})
export class DiceService {
	private collections: DiceCollection[];

	constructor() {
		this.collections = [];

		data["dice-collection"].forEach((x: { name: string; dice: string[][]; height: number; width: number; }) => {
			return this.collections.push(new DiceCollection(x.name, x.dice, x.height, x.width));
		})
	}

	getAllCollections(): DiceCollection[] {
		return this.collections;
	}

	getAllDiceNames(): string[] {
		return this.collections.map(c => c.name);
	}

	getDiceByName(name: string): DiceCollection {
		return this.collections.find(c => c.name === name);
	}
}