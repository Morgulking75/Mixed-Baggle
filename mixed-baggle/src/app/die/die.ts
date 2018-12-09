export class Die {
	public sides: Array<string>;
	public showing: string;
	public selected: boolean;

	constructor(sides: Array<string>) {
		this.sides = sides;
	}
}