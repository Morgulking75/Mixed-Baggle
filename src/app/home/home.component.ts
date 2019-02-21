import { Component, OnInit } from '@angular/core';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { Die } from '../die/die';
import { HashEnum } from '../game-board/hashenum';
import { TraverseService } from '../game-board/traverse.service';
import { Settings } from '../settings/settings';
import { ShakerService } from '../shaker/shaker.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	title = 'mixed-baggle';

	constructor() { }
	public settings: Settings = new Settings();
	public shakenDice: Array<Array<Die>> = [];
	public enteredText: string;
	public guessedWords: Map<string, number>;
	public wordList: Map<string, number>;
	public timeTaken = 0;
	public wordCount = 0;
	private scoring: Map<number, number>;
	public totalPoints = 0;
	public showFoundWords = false;

	faAngleDown = faAngleDown;
	faAngleUp = faAngleUp;

	ngOnInit() {
		this.guessedWords = new Map<string, number>();
		this.wordList = new Map<string, number>();
		this.scoring = new Map<number, number>();
		this.scoring[3] = 1;
		this.scoring[4] = 1;
		this.scoring[5] = 2;
		this.scoring[6] = 3;
		this.scoring[7] = 5;
		this.scoring[8] = 11;
	}

	public generateBoard = () => {
		if (this.settings.height * this.settings.width > this.settings.dice.dice.length) {
			return;
		}

		this.shakenDice = [];
		let availableLetters = this.settings.dice.dice.slice();
		let shakerService = new ShakerService(this.settings.seed);
		let letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

		for (let x = 0; x < this.settings.height; x++) {
			let col = new Array<Die>();

			for (let y = 0; y < this.settings.width; y++) {
				if (availableLetters.length > 0) {
					let chosenDie = shakerService.chooseDie(availableLetters);

					availableLetters.filter(function (value, index, arr) {
						return value === chosenDie;
					});

					chosenDie.showing = shakerService.chooseSide(chosenDie);
					chosenDie.heatMap.clearAll();
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

		let filteredWordList = this.settings.dictionary.trimWordsContainingLetters(letters);

		filteredWordList = filteredWordList.filter(x => x.length >= this.settings.minlength);

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
		if (!this.guessedWords[this.enteredText.toUpperCase()]
			&& this.wordList[this.enteredText.toUpperCase()]) {
			let wordLength = this.enteredText.length > 8 ? 8 : this.enteredText.length;
			let points = this.scoring[wordLength];

			this.guessedWords[this.enteredText.toUpperCase()] = points;
			this.totalPoints += points;
			this.enteredText = "";
		}
		else {
			$event.target.select();
		}
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

	toArray(obj) {
		return Object.keys(obj).map((key) => { return { "key": key, "value": obj[key] }; });
	}
}
