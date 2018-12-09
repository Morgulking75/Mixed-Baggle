import { Die } from '../die/die';

export class GameBoard {
	dice: Array<Array<Die>>;
	constructor(dice: Array<Array<Die>>) {
		this.dice = dice;
	}
}