import { Component } from '@angular/core';
import { DiceService } from './dice/dice.service';
import { DiceCollection } from './dice/diceCollection';
import { ShakerService } from './shaker/shaker.service';

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
	public seed: number;

	ngOnInit() {
		this.collections = this.diceService.getAllCollections();

		if (this.collections.length > 0) {
			this.selectedDiceCollection = this.collections[0];
			this.height = this.selectedDiceCollection.height;
			this.width = this.selectedDiceCollection.width;
		}
	}

	public generateBoard = () => {
		let letters = Array<Array<string>>();
		let availableLetters = this.selectedDiceCollection.dice;
		this.shakerService = new ShakerService(this.seed);

		for (let x = 0; x < this.height; x++) {
			for (let y = 0; y < this.width; y++) {
				if (availableLetters.length > 0) {
					let chosenDie = this.shakerService.chooseDie(availableLetters);

					availableLetters.filter(function (value, index, arr) {
						return value === chosenDie;
					});

					let chosenSide = this.shakerService.chooseSide(chosenDie);

					letters[x][y] = chosenSide;
				}
			}
		}
	}
}
