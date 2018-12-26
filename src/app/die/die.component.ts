import { Component, Input } from '@angular/core';
import { Die } from './die'

@Component({
	selector: 'die',
	templateUrl: './die.html',
	styleUrls: ['./die.scss']
})

export class DieComponent {
	@Input() die: Die;
}
