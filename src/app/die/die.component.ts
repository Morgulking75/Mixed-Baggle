import { Component, Input } from '@angular/core';
import { Die } from './die'
import { HeatMapEnum } from '../heatMap/heatMapEnum';

@Component({
	selector: 'die',
	templateUrl: './die.component.html',
	styleUrls: ['./die.component.scss']
})

export class DieComponent {
	@Input() die: Die;
	@Input() heatMap: HeatMapEnum;

	public HeatMapEnum = HeatMapEnum;
	public showHeatMap: boolean = false;
	public helpString: string = "";

	/**
	 * colorDie
	 * heatMapEnum: HeatMapEnum	 */
	public colorDie(heatMapEnum: HeatMapEnum) {
		let red = 255;
		let green = 255;
		let blue = 255;
		let wordCount = 0;

		switch (heatMapEnum) {
			case HeatMapEnum.Start:
				wordCount = this.die.heatMap.start;
				this.showHeatMap = true;
				break;
			case HeatMapEnum.Middle:
				wordCount = this.die.heatMap.middle;
				this.showHeatMap = true;
				break;
			case HeatMapEnum.End:
				wordCount = this.die.heatMap.end;
				this.showHeatMap = true;
				break;
			default:
			case HeatMapEnum.None:
				this.showHeatMap = false;
				break;
		}

		let subtraction = wordCount * 2;

		blue -= subtraction > 255 ? 255 : subtraction;
		green -= subtraction > 255 ? subtraction - 255 : 0;

		this.helpString = this.showHeatMap ? this.die.heatMap.toString() : "";

		return "rgb(" + red + "," + green + "," + blue + ")";
	}
}
