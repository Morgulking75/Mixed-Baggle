import { Injectable, Optional } from '@angular/core';
import { Point } from './point';
import { Die } from '../die/die';

@Injectable({
	providedIn: 'root',
})

export class TraverseService {
	public foundWord: Array<string>;

	constructor(@Optional() public dictionary: Array<string>, @Optional() public board: Array<Array<Die>>) {
		this.foundWord = [];
	}

	public highlightWord() {
		let path = Array<Point>();

		for (let x = 0; x < this.board.length; x++) {
			for (let y = 0; y < this.board[x].length; y++) {
				this.board[x][y].selected = false;
			}
		}

		for (let x = 0; x < this.board.length; x++) {
			for (let y = 0; y < this.board[x].length; y++) {
				path = [];
				path.push(new Point(x, y));

				this.findNext(path, "", x, y, true);
			}
		}
	}

	public getWordList(): Array<string> {
		let path = Array<Point>();

		for (let x = 0; x < this.board.length; x++) {
			for (let y = 0; y < this.board[x].length; y++) {
				path = [];
				path.push(new Point(x, y));

				this.findNext(path, "", x, y, false);
			}
		}

		return this.foundWord;
	}

	private findNext(path: Array<Point>, assembledWord: string, x: number, y: number, highlightWord: boolean) {
		assembledWord += this.board[x][y].showing;

		if (this.dictionary.filter(word => word.toUpperCase() === assembledWord.toUpperCase()).length > 0) {
			if (highlightWord) {
				this.highlight(path);
			}

			if (this.foundWord.filter(word => word.toUpperCase() === assembledWord.toUpperCase()).length === 0) {
				this.foundWord.push(assembledWord);
			}
		}

		if (this.dictionary.filter(word => word.toUpperCase().indexOf(assembledWord.toUpperCase()) === 0).length > 0) {
			for (let addX = -1; addX < 2; addX++) {
				for (let addY = -1; addY < 2; addY++) {
					let moveX = x + addX;
					let moveY = y + addY;

					if (moveX > -1 && moveX < this.board.length
						&& moveY > -1 && moveY < this.board[x].length
						&& path.filter(p => p.x === moveX && p.y === moveY).length === 0) {
						let newPath = path.slice();

						newPath.push(new Point(moveX, moveY));

						this.findNext(newPath, assembledWord, moveX, moveY, highlightWord);
					}
				}
			}

		}

	}

	private highlight(path: Array<Point>) {
		path.forEach(p => this.board[p.x][p.y].selected = true);
	}
}