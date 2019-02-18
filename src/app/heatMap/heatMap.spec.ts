import { TestBed, async } from '@angular/core/testing';
import { HeatMap } from './heatMap';

describe('HeatMap', () => {
	let heatMap: HeatMap;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			providers: [HeatMap]
		}).compileComponents()
			.then(() => {
				heatMap = new HeatMap();
			});
	}));

	it('should have zero as initial start value', () => {
		expect(heatMap.start).toEqual(0);
	});

	it('should have zero as initial middle value', () => {
		expect(heatMap.middle).toEqual(0);
	});

	it('should have zero as initial end value', () => {
		expect(heatMap.end).toEqual(0);
	});

	it('should increase start when calling addStart', () => {
		heatMap.addStart();

		expect(heatMap.start).toEqual(1);
	});

	it('should increase middle when calling addMiddle', () => {
		heatMap.addMiddle();

		expect(heatMap.middle).toEqual(1);
	});

	it('should increase end when calling addEnd', () => {
		heatMap.addEnd();

		expect(heatMap.end).toEqual(1);
	});
});
