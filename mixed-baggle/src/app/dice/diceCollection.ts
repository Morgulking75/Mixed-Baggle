import { Die } from '../die/die';

export class DiceCollection {
	name: string;
	dice: Array<Die>;
	width: number;
	height: number;
	constructor(name: string, dice: Array<Array<string>>, height: number, width: number) {
		this.name = name;
		this.height = height;
		this.width = width;
		this.dice = [];

		dice.forEach(x => this.dice.push(new Die(x)));
	}
}