import { ArmourScheme } from './armourscheme'
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

console.log(leander)
console.log(york)
console.log(deutschland)