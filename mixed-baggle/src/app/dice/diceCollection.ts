import { Die } from './die';

export class DiceCollection {
	name: string;
	dice: Array<Die>;
	constructor(name: string, dice: Array<Array<string>>) {
		this.name = name;

		dice.forEach(function (die: Array<string>) {
			this.dice.add(new Die(die));
		});
	}
}