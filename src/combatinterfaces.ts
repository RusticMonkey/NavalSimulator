import { Dice } from './dice';
import { ShipClass } from './shipclass';

export interface CombatAlgorithms{
    fireGuns(sourceShip: Ship, targetShip: Ship, range: number, dicePool: Dice) : string[]
}