import { Component, Input } from '@angular/core';
import { Die } from '../die/die';

@Component({
	selector: 'game-board',
	templateUrl: './game-board.html',
	styleUrls: ['./game-board.scss']
})
export class GameBoardComponent {
	@Input() dice: Array<Array<Die>>;
}
