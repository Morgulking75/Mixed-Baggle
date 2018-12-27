export class Dictionary {
	constructor(public name: string, public wordList: Array<string>) { }

	trimWordsContainingLetters(letters: Array<string>) {
		let filterWordList = this.wordList.slice();

		for (let x = 0; x < letters.length; x++) {
			filterWordList = filterWordList.filter(word => word.toUpperCase().indexOf(letters[x].toUpperCase()) === -1);
		}

		return filterWordList;
	}
}