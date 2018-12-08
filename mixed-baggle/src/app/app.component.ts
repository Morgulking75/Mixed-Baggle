import { Component } from '@angular/core';
import { DiceService } from './dice/dice.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'mixed-baggle';

	constructor(private diceService: DiceService) { }

	public diceNames: Array<string>;

	ngOnInit() {
		this.diceService.parseDice();

		this.diceNames = this.diceService.getAllDiceNames();
	}
}
