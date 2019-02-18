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
}