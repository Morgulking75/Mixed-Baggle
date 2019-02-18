import { HeatMap } from '../heatMap/heatMap';

export class Die {
	public sides: Array<string>;
	public showing: string;
	public selected: boolean;
	public heatMap: HeatMap;

	constructor(sides: Array<string>) {
		this.sides = sides;
		this.heatMap = new HeatMap();
	}
}