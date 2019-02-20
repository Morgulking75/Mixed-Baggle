export class HeatMap {
	public start: number;
	public middle: number;
	public end: number;

	constructor() {
		this.start = 0;
		this.middle = 0;
		this.end = 0;
	}

	/**
	 * addStart
	 */
	public addStart() {
		this.start++;
	}

	/**
	 * addMiddle
	 */
	public addMiddle() {
		this.middle++;
	}

	/**
	 * addEnd
	 */
	public addEnd() {
		this.end++;
	}

	public clearAll() {
		this.start = 0;
		this.middle = 0;
		this.end = 0;
	}

	public toString() {
		return "start: " + this.start + ", middle: " + this.middle + ", end: " + this.end;
	}
}