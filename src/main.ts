import { ArmourScheme } from './armourscheme'
import { Dice } from './dice'
import { Gun } from './gun'
import {ShipClass} from './shipclass'

console.log('---------------------------------')
console.log('-- Naval battle simulator      --')
console.log('---------------------------------')

const leanderArmour = new ArmourScheme(1, 1, 3)
const leanderGuns = new Array<Gun>()
leanderGuns.push(new Gun('4 x twin BL 6 in guns', 25, 8, 8, 6, false))
const leander = new ShipClass('Leander', 'Royal Navy', 3, 7, leanderArmour, leanderGuns)

const yorkArmour = new ArmourScheme(1, 1.5, 3)
const yorkGuns = new Array<Gun>()
yorkGuns.push(new Gun('3 x twin BL 8 in guns', 28, 6, 4, 8, false))
const york = new ShipClass('York', 'Royal Navy', 4, 8, yorkArmour, yorkGuns)

const deutschlandArmour = new ArmourScheme(3, 1.8, 5)
const deutschlandGuns = new Array<Gun>()
deutschlandGuns.push(new Gun('6x28cm triple turrets', 36, 6, 2.5, 11.1, false))
deutschlandGuns.push(new Gun('8x15cm single turrets', 23, 8, 8, 6, false))
const deutschland = new ShipClass('Deutschland', 'Kriegsmarine', 4, 10, deutschlandArmour, deutschlandGuns)

const tribalArmour = new ArmourScheme(0, 0, 0)
const tribalGuns = new Array<Gun>()
tribalGuns.push(new Gun('4 x twin 4.7 in guns', 16, 8, 15, 4.7, true))
const tribal = new ShipClass('Tribal', 'Royal Navy', 2, 2, tribalArmour, tribalGuns)

const queenElizabethArmour = new ArmourScheme(13, 3, 11)
const queenElizabethGuns = new Array<Gun>()
queenElizabethGuns.push(new Gun('4 x twin 15in guns', 33, 8, 2, 15, false))
queenElizabethGuns.push(new Gun('14 single BL 6 in guns', 25, 14, 8, 6, false))
const queenElizabeth = new ShipClass('Queen Elizabeth', 'Royal Navy', 6, 32, queenElizabethArmour, queenElizabethGuns)

const bismarckArmour = new ArmourScheme(13, 4, 13)
const bismarckGuns = new Array<Gun>()
bismarckGuns.push(new Gun('8 x 38cm', 37, 8, 2.5, 15, false))
bismarckGuns.push(new Gun('12 x 15 cm', 23, 12, 8, 6, false))
const bismarck = new ShipClass('Bismarck', 'Kriegsmarine', 6, 41, bismarckArmour, bismarckGuns)

const type1936AArmour = new ArmourScheme(0, 0, 0)
const type1936AGuns = new Array<Gun>()
type1936AGuns.push(new Gun('4 x single 15cm cm', 23, 4, 8, 6, false))
const type1936A = new ShipClass('Type 1936A', 'Kriegsmarine', 2, 3, type1936AArmour, type1936AGuns)
const dicePool = new Dice()

function SimulateCombat(combatant1: ShipClass, combatant2: ShipClass, startingRange: number, closingRate: number, minimumRange: number, dicePool: Dice) {
    console.log("-------------------------")
    console.log(`Simulating combat between ${combatant1.name} and ${combatant2.name}`)
    for (let range=startingRange; range >= minimumRange; range -= closingRate) {
        console.log(`RANGE ${range}`)
        if (combatant1.scale < combatant2.scale) {
            console.log(combatant1.fireGuns(combatant2, range, dicePool))
            console.log(combatant2.fireGuns(combatant1, range, dicePool))
        }
        else{
            console.log(combatant2.fireGuns(combatant1, range, dicePool))
            console.log(combatant1.fireGuns(combatant2, range, dicePool))
        }
        if (combatant1.hull == 0 || combatant2.hull == 0) {
            range = minimumRange //sneaky way of breaking this loop
        }
    }
    while (combatant1.hull >0 && combatant2.hull > 0) {
        if (combatant1.scale < combatant2.scale) {
            console.log(combatant1.fireGuns(combatant2, minimumRange, dicePool))
            console.log(combatant2.fireGuns(combatant1, minimumRange, dicePool))
        }
        else{
            console.log(combatant2.fireGuns(combatant1, minimumRange, dicePool))
            console.log(combatant1.fireGuns(combatant2, minimumRange, dicePool))
        }
    }
    
    console.log("-------------------------")
    console.log(`***** ${combatant1.name}: ${combatant1.hull}` )
    console.log(`***** ${combatant2.name}: ${combatant2.hull}` )
    console.log("-------------------------")
}

SimulateCombat(leander, type1936A, 50, 6, 6, dicePool)
SimulateCombat(leander, deutschland, 50, 6, 6, dicePool)
SimulateCombat(leander, bismarck, 50, 6, 6, dicePool)

SimulateCombat(york, type1936A, 50, 6, 6, dicePool)
SimulateCombat(york, deutschland, 50, 6, 6, dicePool)
SimulateCombat(york, bismarck, 50, 6, 6, dicePool)

SimulateCombat(tribal, type1936A, 50, 6, 6, dicePool)
SimulateCombat(tribal, deutschland, 50, 6, 6, dicePool)
SimulateCombat(tribal, bismarck, 50, 6, 6, dicePool)

SimulateCombat(queenElizabeth, type1936A, 50, 6, 6, dicePool)
SimulateCombat(queenElizabeth, deutschland, 50, 6, 6, dicePool)
SimulateCombat(queenElizabeth, bismarck, 50, 6, 6, dicePool)