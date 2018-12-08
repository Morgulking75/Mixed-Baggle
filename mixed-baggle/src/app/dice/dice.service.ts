import { Injectable } from '@angular/core';
import * as data from './dice.json';
import { DiceCollection } from './diceCollection';

@Injectable({
	providedIn: 'root',
})

export class DiceService {
	constructor() { }

	collections = Array<DiceCollection>();

	parseDice() {
		this.collections = [];

		(<any>data["dice-collection"]).forEach(element => {
			this.collections.push(new DiceCollection(element.name, element.dice));
		});
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