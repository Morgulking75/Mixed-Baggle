import { Component, Input, OnInit } from '@angular/core';
import { DiceService } from '../dice/dice.service';
import { DiceCollection } from '../dice/diceCollection';
import { Dictionary } from '../dictionary/dictionary';
import { DictionaryService } from '../dictionary/dictionary.service';
import { Settings } from './settings';

@Component({
	selector: 'app-game-settings',
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
	@Input() settings: Settings;

	public showSettings: false;
	private maxSeed = 9999999;
	private dictionaries: Array<Dictionary>;
	private dices: Array<DiceCollection>;

	constructor(private dictionaryService: DictionaryService, private diceService: DiceService) { }

	ngOnInit() {
		this.settings.seed = Math.floor(Math.random() * this.maxSeed);

		this.dices = this.diceService.getAllCollections();
		this.dictionaries = this.dictionaryService.getAllCollections();

		if (this.dices.length > 0) {
			this.settings.dice = this.dices[0];
			this.settings.height = this.settings.dice.height;
			this.settings.width = this.settings.dice.width;
		}

		if (this.dictionaries.length > 0) {
			this.settings.dictionary = this.dictionaries[0];
		}
	}
}
