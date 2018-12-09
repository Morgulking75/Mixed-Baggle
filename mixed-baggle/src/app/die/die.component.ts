import { Component, Input } from '@angular/core';

@Component({
	selector: 'die',
	templateUrl: './die.html',
	styleUrls: ['./die.scss']
})

export class DieComponent {
	@Input() letter: string;
}
