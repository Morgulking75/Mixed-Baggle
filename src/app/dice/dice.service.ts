import { Injectable } from '@angular/core';
import { DiceCollection } from './diceCollection';
import * as data from './dice.json';

@Injectable({
	providedIn: 'root',
})

export class DiceService {
	collections = Array<DiceCollection>();

	constructor() {
		this.collections = [];

		data["dice-collection"].forEach(x => this.collections.push(new DiceCollection(x.name, x.dice, x.height, x.width)))
	}

	getAllCollections(): Array<DiceCollection> {
		return this.collections;
	}

	getAllDiceNames(): Array<string> {
		return this.collections.map(c => c.name);
	}

	getDiceByName(name: string): DiceCollection {
		return this.collections.find(c => c.name === name);
	}
}