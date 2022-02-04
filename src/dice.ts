export class Dice {
    private rollDice(howMany: number, diceMax: number) : number[] {
        const diceResults = new Array<number>()
        
        for (let i = 0; i < howMany; i++) {
            diceResults.push(this.generateRandomNumber(1, diceMax))
          }
        return diceResults
    }

    private generateRandomNumber(min: number, max: number) : number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    public RollD6(howMany: number) {
        return this.rollDice(howMany, 6)
    }
    public rollD10(howMany: number) {
        return this.rollDice(howMany, 10)
    }
}