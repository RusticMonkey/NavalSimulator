export class Gun {
   
    constructor(readonly name: string, readonly range: number, readonly barrels: number, 
        readonly rateOfFire: number, readonly calibre: number, readonly dualPurpose: boolean) {
        }
}