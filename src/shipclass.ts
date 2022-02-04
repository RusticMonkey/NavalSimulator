import {ArmourScheme} from './armourscheme'
import {Gun} from './gun'

export class ShipClass {
    constructor(private name: string, private nationality: string, private scale: number, private hull: number,
        private armourScheme: ArmourScheme, private guns: Gun[]) { }
}