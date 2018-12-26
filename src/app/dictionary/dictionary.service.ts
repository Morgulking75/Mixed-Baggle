import { Injectable } from '@angular/core';
import * as data from './dictionary.json';
import { Dictionary } from './dictionary';

@Injectable({
	providedIn: 'root',
})
export class DictionaryService {
	private collections: Dictionary[];

	constructor() {
		this.collections = [];
		data["dictionary-collection"].forEach(x => this.collections.push(new Dictionary(x.name, x.words)))
	}

	getAllCollections(): Dictionary[] {
		return this.collections;
	}
}