import { ShipClass } from './shipclass';

export class Ship {
    readonly shipClass: ShipClass
    public hull: number
    
    constructor(readonly name: string, shipClass: ShipClass) {
        this.shipClass = shipClass
        this.hull = shipClass.hull
    }
}