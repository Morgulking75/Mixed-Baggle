import { Component, Input } from '@angular/core';
import { Settings } from './settings';
import { DiceCollection } from '../dice/diceCollection';
import { Dictionary } from '../dictionary/dictionary';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { DictionaryService } from '../dictionary/dictionary.service';
import { DiceService } from '../dice/dice.service';

@Component({
	selector: 'settings',
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
	@Input() settings: Settings;

	public showSettings: boolean = true;
	private maxSeed: number = 9999999;
	private dictionaries: Array<Dictionary>;
	private dices: Array<DiceCollection>;

	faAngleDown = faAngleDown;
	faAngleUp = faAngleUp;

	ngOnInit() {
		this.settings.seed = Math.floor(Math.random() * this.maxSeed);

		let dictionaryService = new DictionaryService();
		let diceService = new DiceService();

		this.dices = diceService.getAllCollections();
		this.dictionaries = dictionaryService.getAllCollections();

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
