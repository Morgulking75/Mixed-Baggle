import { Injectable } from '@angular/core';
import { Point } from './point';
import { Die } from '../die/die';
import { HashEnum } from './hashenum';

@Injectable()
export class TraverseService {
	public foundWord: Map<string, number>;

	constructor(public hash?: Map<string, HashEnum>, public board?: Array<Array<Die>>) {
		this.foundWord = new Map<string, number>();
	}

	public highlightWord() {
		let path: Point[];
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

	public getWordList(): Map<string, number> {
		let path: Point[];
		for (let x = 0; x < this.board.length; x++) {
			for (let y = 0; y < this.board[x].length; y++) {
				path = [];
				path.push(new Point(x, y));
				this.findNext(path, "", x, y, false);
			}
		}

		return this.foundWord;
	}

	private updateHeatMap(path: Array<Point>) {
		let endIndex = path.length - 1;

		this.board[path[0].x][path[0].y].heatMap.addStart();
		this.board[path[endIndex].x][path[endIndex].y].heatMap.addEnd();

		for (let x = 1; x < endIndex; x++) {
			this.board[path[x].x][path[x].y].heatMap.addMiddle();
		}
	}

	private findNext(path: Array<Point>, assembledWord: string, x: number, y: number, highlightWord: boolean) {
		assembledWord += this.board[x][y].showing.toUpperCase();
		let hashValue = this.hash[assembledWord] || HashEnum.DoesNotExist;
		let searchAround = false;

		switch (hashValue) {
			case HashEnum.DoesNotExist:
				return;
			case HashEnum.PartialWord:
				searchAround = true;
				break;
			case HashEnum.FullWord:
				if (highlightWord) {
					this.highlight(path);
				}

				this.foundWord[assembledWord] = (this.foundWord[assembledWord] || 0) + 1;

				this.updateHeatMap(path);
				break;
			case HashEnum.ContinuingWord:
				if (highlightWord) {
					this.highlight(path);
				}

				this.foundWord[assembledWord] = (this.foundWord[assembledWord] || 0) + 1;
				searchAround = true;
				this.updateHeatMap(path);
				break;
			default:
				break;
		}

		if (searchAround) {
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