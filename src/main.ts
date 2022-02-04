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
const ajax = new ShipClass('Leander', 'Royal Navy', 3, 7, leanderArmour, leanderGuns)
const achilles = new ShipClass('Leander', 'Royal Navy', 3, 7, leanderArmour, leanderGuns)

const yorkArmour = new ArmourScheme(1, 1.5, 3)
const yorkGuns = new Array<Gun>()
yorkGuns.push(new Gun('3 x twin BL 8 in guns', 28, 6, 4, 8, false))
const york = new ShipClass('York', 'Royal Navy', 4, 8, yorkArmour, yorkGuns)

const deutschlandArmour = new ArmourScheme(3, 1.8, 5)
const deutschlandGuns = new Array<Gun>()
deutschlandGuns.push(new Gun('6x28cm triple turrets', 36, 6, 2.5, 11.1, false))
deutschlandGuns.push(new Gun('8x15cm single turrets', 23, 8, 8, 6, false))
const deutschland = new ShipClass('Deutschland', 'Kriegsmarine', 4, 10, deutschlandArmour, deutschlandGuns)

const dicePool = new Dice()

//todo - initiative!
//todo - movement!
console.log('---------------------------------')
console.log("--------Deutschland Initial State")
console.log(deutschland)
console.log("--------Ajax Initial State")
console.log(ajax)
console.log("--------Achilles Initial State")
console.log(achilles)
console.log("--------York Initial State")
console.log(york)
console.log('---------------------------------')
for (let range=50; range >= 6; range -= 6) {
    //ships converge by 6 inches each "turn"
    console.log('---------------------------------')
    console.log(`firing at range ${range}`)
    if (ajax.hull > 0){
        console.log('--ajax firing')
        console.log(ajax.fireGuns(deutschland, range, dicePool))
    }
    if (achilles.hull > 0){
        console.log('--achilles firing')
        console.log(achilles.fireGuns(deutschland, range, dicePool))
    }
    if (york.hull > 0){
        console.log('--york firing')
        console.log(york.fireGuns(deutschland, range, dicePool))
    }
    if (deutschland.hull > 0) {
        console.log('--deutschland firing')
        if (york.hull > 0){
            console.log(deutschland.fireGuns(york, range, dicePool))
        }
        else if (ajax.hull > 0) {
            console.log(deutschland.fireGuns(ajax, range, dicePool))
        }
        else{
            console.log(deutschland.fireGuns(achilles, range, dicePool))
        }

        
    }
    console.log(`Ajax hull at ${ajax.hull}`)
    console.log(`Achilles hull at ${achilles.hull}`)
    console.log(`York hull at ${york.hull}`)
    console.log(`Deutschland hull at ${deutschland.hull}`)
}
const range = 6
while ( (york.hull >0 || ajax.hull > 0 || achilles.hull > 0) && deutschland.hull > 0 ) {
    if (ajax.hull > 0){
        console.log('--ajax firing')
        console.log(ajax.fireGuns(deutschland, range, dicePool))
    }
    if (achilles.hull > 0){
        console.log('--achilles firing')
        console.log(achilles.fireGuns(deutschland, range, dicePool))
    }
    if (york.hull > 0){
        console.log('--york firing')
        console.log(york.fireGuns(deutschland, range, dicePool))
    }
    if (deutschland.hull > 0) {
        console.log('--deutschland firing')
        if (york.hull > 0){
            console.log(deutschland.fireGuns(york, range, dicePool))
        }
        else if (ajax.hull > 0) {
            console.log(deutschland.fireGuns(ajax, range, dicePool))
        }
        else{
            console.log(deutschland.fireGuns(achilles, range, dicePool))
        }
    }
    console.log(`Ajax hull at ${ajax.hull}`)
    console.log(`Achilles hull at ${achilles.hull}`)
    console.log(`York hull at ${york.hull}`)
    console.log(`Deutschland hull at ${deutschland.hull}`)
}
