import { Dice } from './dice';
import { ShipClass } from './shipclass';

export interface CombatAlgorithms{
    fireGuns(targetShip: ShipClass, range: number, dicePool: Dice) : string[]
}