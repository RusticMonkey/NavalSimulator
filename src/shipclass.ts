import {ArmourScheme} from './armourscheme'
import { CombatAlgorithms } from './combatalgorithms'
import { Dice } from './dice'
import {Gun} from './gun'


export class ShipClass implements CombatAlgorithms {
    constructor(readonly name: string, readonly nationality: string, readonly scale: number, public hull: number,
        readonly armourScheme: ArmourScheme, readonly guns: Gun[]) { }

    fireGuns(targetShip: ShipClass, range: number, dicePool: Dice) {
        const combatLog = new Array<string>()
        this.guns.forEach(gun => {
            if (this.checkRange(gun, range)) {
                combatLog.push(`Weapon system ${gun.name} in range`)
                const plungingFire = this.isPlungingFire(gun, range)
                let armourToUse = targetShip.armourScheme.main
                if (plungingFire){
                    armourToUse = targetShip.armourScheme.plunging
                }
                combatLog.push(`Plunging fire is ${plungingFire}, target armour is ${armourToUse}`)
                const hitRecord = this.resolveHits(gun, targetShip, armourToUse, combatLog, dicePool, plungingFire)
                const penetrations = this.resolveArmourPenetration(hitRecord.hits, armourToUse, gun.calibre, dicePool, combatLog)
                const damage = this.calculateDamage(penetrations, gun.calibre, targetShip.scale, dicePool, combatLog)
                //todo - crits
                targetShip.hull -= damage
            }
            else{
                combatLog.push(`Weapon system ${gun.name} out of range`)
            }
        }); 
        return combatLog
    }

    private checkRange(gun: Gun, range: number): boolean {
        return gun.range >= range
    }
    private isPlungingFire(gun: Gun, range: number): boolean {
        return range >= gun.range / 2
    }
    private resolveHits(gun: Gun, targetShip: ShipClass, targetArmour: Number, combatLog: string[], dicePool: Dice, isPlunging: boolean): {hits: number, crits: number} {
        let numCrits = 0
        const shots = Math.ceil((gun.barrels * gun.rateOfFire) / 3)
        return this.resolveSingleHit(shots, targetShip.scale, dicePool, combatLog, isPlunging)
    }
    private resolveSingleHit(numShots: number, targetScale: number, dicePool: Dice, combatLog: string[], isPlunging: boolean): {hits: number, crits: number} {
        let targetHitScore = 10-targetScale
        if (isPlunging) {
            targetHitScore += 2
        }
        combatLog.push(`Target hit score is ${targetHitScore}`)
        const diceRolls = dicePool.rollD10(numShots)
        combatLog.push(`Rolled: ${diceRolls}`)
        const hits = diceRolls.filter((roll) => roll >= targetHitScore).length
        const crits  = diceRolls.filter((roll) => roll == 10).length
        const misses = numShots - hits
        combatLog.push(`~Hits: ${hits}`)
        combatLog.push(`~Misses: ${misses}`)
        combatLog.push(`~PotentialCrits: ${crits}`)
        const hitRecord = {
                hits: hits,
                crits: crits
        }
        return hitRecord
    }

    private resolveArmourPenetration(numHits: number, targetArmour: number, shotCalibre: number, dicePool: Dice, combatLog: string[]): number {
        const targetScore = Math.ceil(12-(shotCalibre - targetArmour))
        combatLog.push(`Target pen score is ${targetScore}`)
        const diceRolls = dicePool.rollD10(numHits)
        combatLog.push(`Rolled: ${diceRolls}`)
        const numPenetrations = diceRolls.filter((roll) => roll >= targetScore).length
        combatLog.push(`Penetrations: ${numPenetrations}`)
        return numPenetrations
    }
    private calculateDamage(numPenetrations: number, shotCalibre: number, targetScale: number, dicePool: Dice, combatLog: string[]) : number {
        let totalPenetrations = numPenetrations

        if (shotCalibre < 10) {
            const targetScore = 9+(targetScale - shotCalibre)
            const diceRolls = dicePool.rollD10(numPenetrations)
            combatLog.push(`Target Score for Damage: ${targetScore}`)
            combatLog.push(`Rolled: ${diceRolls}`)
            const damage = diceRolls.filter((roll) => roll >= targetScore).length
            totalPenetrations = damage
        }
        combatLog.push(`Damage: ${totalPenetrations}`)
        return totalPenetrations
    }
}