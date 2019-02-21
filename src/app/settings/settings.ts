import { DiceCollection } from '../dice/diceCollection';
import { Dictionary } from '../dictionary/dictionary';

export class Settings {
    public dice: DiceCollection;
    public dictionary: Dictionary;
    public minlength: number = 4;
    public height: number = 6;
    public width: number = 6;
    public seed: number = 0;
    public showInitialWords: boolean = false;
    public seconds: number = 180;

    constructor() { }
}
