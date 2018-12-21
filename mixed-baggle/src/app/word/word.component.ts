import { Component, Input } from '@angular/core';
import { Word } from './word';

@Component({
	selector: 'word',
	templateUrl: './word.html',
	styleUrls: ['./word.scss']
})

export class WordComponent {
	@Input() word: Word;
}
