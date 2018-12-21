import { Component, Input, SimpleChanges } from '@angular/core';
import { Die } from '../die/die';
import { faUndo } from '@fortawesome/free-solid-svg-icons';
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'game-board',
	templateUrl: './game-board.html',
	styleUrls: ['./game-board.scss']
})
export class GameBoardComponent {
	@Input() dice: Array<Array<Die>>;
	@Input() word: string;
	boardLoaded = false;
	faUndo = faUndo;
	faExchangeAlt = faExchangeAlt;
	public zoomTick: number = 1;

	ngOnChanges(changes: SimpleChanges) {
		this.boardLoaded = this.dice.length > 0;
	}

	rotateCc() {
		let tempArray = new Array<Array<Die>>();

		for (let x = 0; x < this.dice[0].length; x++) {
			let tempRow = [];

			this.dice.forEach(row => tempRow.push(row[x]));

			tempArray.push(tempRow.reverse());
		}

		this.dice = tempArray;
	}

	rotateCcw() {
		let tempArray = new Array<Array<Die>>();

		for (let x = this.dice[0].length - 1; x > -1; x--) {
			let tempRow = [];

			this.dice.forEach(row => tempRow.push(row[x]));

			tempArray.push(tempRow);
		}

		this.dice = tempArray;
	}

	flip() {
		this.dice.forEach(row => row = row.reverse());
	}
}
