import { Component } from '@angular/core';
import { DiceService } from './dice/dice.service';
import { DiceCollection } from './dice/diceCollection';
import { ShakerService } from './shaker/shaker.service';
import { Die } from './die/die';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'mixed-baggle';

	constructor(private diceService: DiceService, private shakerService: ShakerService) { }

	public collections: Array<DiceCollection>;
	public selectedDiceCollection: DiceCollection;
	public height: number = 6;
	public width: number = 6;
	public maxSeed: number = 99999999;
	public seed: number = Math.floor(Math.random() * this.maxSeed);
	public shakenDice: Array<Array<Die>> = [];

	ngOnInit() {
		this.collections = this.diceService.getAllCollections();

		if (this.collections.length > 0) {
			this.selectedDiceCollection = this.collections[0];
			this.height = this.selectedDiceCollection.height;
			this.width = this.selectedDiceCollection.width;
		}
	}

	public generateBoard = () => {
		if (this.height * this.width > this.selectedDiceCollection.dice.length) {
			return;
		}

		this.shakenDice = [];
		let availableLetters = this.selectedDiceCollection.dice;
		this.shakerService = new ShakerService(this.seed);

		for (let x = 0; x < this.height; x++) {
			let col = new Array<Die>();

			for (let y = 0; y < this.width; y++) {
				if (availableLetters.length > 0) {
					let chosenDie = this.shakerService.chooseDie(availableLetters);

					availableLetters.filter(function (value, index, arr) {
						return value === chosenDie;
					});

					chosenDie.showing = this.shakerService.chooseSide(chosenDie);

					col.push(chosenDie);
				}
			}

			this.shakenDice.push(col);
		}
	}
}
