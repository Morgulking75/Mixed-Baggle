export class Word {
	public word: string;
	public score: number;
	public isLegit: boolean = true;
	public isHighlighted: boolean = false;
	public wasAlsoGuessed: boolean = false;

	constructor(word: string, score: number) {
		this.word = word;
		this.score = score;
	}
}