import { Component } from '@angular/core';
import { DiceService } from './dice/dice.service';
import { DiceCollection } from './dice/diceCollection';
import { ShakerService } from './shaker/shaker.service';
import { Die } from './die/die';
import { TraverseService } from './game-board/traverse.service';
import { DictionaryService } from './dictionary/dictionary.service';
import { Dictionary } from './dictionary/dictionary';
import { HashEnum } from './game-board/hashenum';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'mixed-baggle';

	constructor(private diceService: DiceService) { }

	public collections: Array<DiceCollection>;
	public dictionaries: Array<Dictionary>;
	public selectedDiceCollection: DiceCollection;
	public selectedDictionaryCollection: Dictionary;
	public height: number = 6;
	public width: number = 6;
	public maxSeed: number = 99999999;
	public seed: number = Math.floor(Math.random() * this.maxSeed);
	public shakenDice: Array<Array<Die>> = [];
	public enteredText: string;
	public guessedWords: Array<string>;
	public wordList: Map<string, number>;
	public minlength: number = 4;
	public timeTaken: number = 0;
	public wordCount: number = 0;

	ngOnInit() {
		let dictionaryService = new DictionaryService();

		this.collections = this.diceService.getAllCollections();
		this.dictionaries = dictionaryService.getAllCollections();
		this.guessedWords = [];
		this.wordList = new Map<string, number>();

		if (this.collections.length > 0) {
			this.selectedDiceCollection = this.collections[0];
			this.height = this.selectedDiceCollection.height;
			this.width = this.selectedDiceCollection.width;
		}

		if (this.dictionaries.length > 0) {
			this.selectedDictionaryCollection = this.dictionaries[0];
		}
	}

	public generateBoard = () => {
		if (this.height * this.width > this.selectedDiceCollection.dice.length) {
			return;
		}

		this.shakenDice = [];
		let availableLetters = this.selectedDiceCollection.dice.slice();
		let shakerService = new ShakerService(this.seed);
		let letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

		for (let x = 0; x < this.height; x++) {
			let col = new Array<Die>();

			for (let y = 0; y < this.width; y++) {
				if (availableLetters.length > 0) {
					let chosenDie = shakerService.chooseDie(availableLetters);

					availableLetters.filter(function (value, index, arr) {
						return value === chosenDie;
					});

					chosenDie.showing = shakerService.chooseSide(chosenDie);

					let split = chosenDie.showing.split("");

					split.forEach(character => {
						let charIndex = letters.indexOf(character);

						if (charIndex > -1) {
							letters.splice(charIndex, 1);
						}
					});

					col.push(chosenDie);
				}
			}

			this.shakenDice.push(col);
		}

		let start = new Date();

		let filteredWordList = this.selectedDictionaryCollection.trimWordsContainingLetters(letters);

		filteredWordList = filteredWordList.filter(x => x.length >= this.minlength);

		let hashTable = this.hashWordList(filteredWordList);

		let traverse = new TraverseService(hashTable, this.shakenDice);

		this.wordList = traverse.getWordList();

		let end = new Date();

		this.timeTaken = end.getTime() - start.getTime();
		this.wordCount = Object.keys(this.wordList).length;

		hashTable = new Map<string, number>();
	}

	public showOnBoard = () => {
		let word = [this.enteredText];

		let traverse = new TraverseService(this.hashWordList(word), this.shakenDice);

		traverse.highlightWord();
	}

	public onKey = ($event) => {
		if (this.guessedWords.filter(word => word.toUpperCase() === this.enteredText.toUpperCase()).length === 0
			&& this.wordList[this.enteredText.toUpperCase()]) {
			this.guessedWords.push(this.enteredText);

			this.guessedWords.sort();

			this.enteredText = "";
		}
	}

	private onlyUnique(value, index, self) {
		return self.indexOf(value) === index;
	}

	private hashWordList(wordList: Array<string>): Map<string, HashEnum> {
		let hashTable = new Map<string, HashEnum>();

		wordList.forEach(element => {
			element = element.toUpperCase();
			let wordArray = element.split("");
			let miniWord = "";

			let result = hashTable[element] || HashEnum.DoesNotExist;

			switch (result) {
				case HashEnum.DoesNotExist:
					hashTable[element] = HashEnum.FullWord;
					break;
				case HashEnum.PartialWord:
					hashTable[element] = HashEnum.ContinuingWord;
					break;
				default:
					break;
			}

			for (let x = 0; x < wordArray.length - 1; x++) {
				miniWord += wordArray[x];

				result = hashTable[miniWord] || HashEnum.DoesNotExist;

				switch (result) {
					case HashEnum.DoesNotExist:
						hashTable[miniWord] = HashEnum.PartialWord;
						break;
					case HashEnum.FullWord:
						hashTable[miniWord] = HashEnum.ContinuingWord
						break;
					default:
						break;
				}
			}
		});

		return hashTable;
	}

	ascOrder = (a, b) => {
		if (a.key > b.key) return a.key;
	}
}
