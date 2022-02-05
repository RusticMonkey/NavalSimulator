import {ArmourScheme} from './armourscheme'
import { Dice } from './dice'
import {Gun} from './gun'


export class ShipClass {
    constructor(readonly name: string, readonly nationality: string, readonly scale: number, public hull: number,
        readonly armourScheme: ArmourScheme, readonly guns: Gun[]) { }
}