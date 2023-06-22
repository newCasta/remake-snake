import { Matrix } from 'xirtam'
import { CELLS, INITIAL_POS } from '../config/constants.ts'
import { Apple } from './apple.ts'
import { Snake } from './snake.ts'

export class Game {
    private _screenWidth
    private _screenHeight
    private _snake
    private _apple
    private _score
    private _screen: string[]
    private _interval?: number

    constructor(settings: GameSettings) {
        this._screenWidth = settings.screenWidth
        this._screenHeight = settings.screenHeight
        this._snake = new Snake({
            position: INITIAL_POS,
            screenWidth: this._screenWidth,
            screenHeight: this._screenHeight
        })
        this._apple = new Apple({
            snake: this._snake,
            game: this
        })
        this._score = 0
        this._screen = []
    }

    get screenWidth(): number {
        return this._screenWidth
    }

    get screenHeight(): number {
        return this._screenHeight
    }

    private get scoreText(): string {
        return ` Score ${this._score} `
    }

    incrementScore(): void {
        this._score = this._score + 1
    }

    private drawScoreText(index: number): string {
        return this.scoreText[index - 6]
    }

    private isScoreTextCell(cell: Cell): boolean {
        const isFirstRow = cell[1] === 0
        const isScoreText = cell[0] >= 6 && cell[0] < 6 + this.scoreText.length

        return isFirstRow && isScoreText
    }

    private isBorderCell(cell: Cell): boolean {
        const isBottomOrTop = cell[0] === 0 || cell[0] >= this.screenWidth - 1
        const isLeftOrRight = cell[1] === 0 || cell[1] >= this.screenHeight - 1

        return isBottomOrTop || isLeftOrRight
    }

    private isSnakeCell(cell: Cell): boolean {
        return this._snake.hasItem(cell)
    }

    private isAppleCell(cell: Cell): boolean {
        return Matrix.compare(this._apple.position, cell)
    }

    private resetScreen(): void {
        this._screen = []
    }

    private addChar(char: string): void {
        this._screen.push(char)
    }

    private drawScreen(): void {
        this.resetScreen()

        for (const cell of CELLS.matrix) {
            if (this.isScoreTextCell(cell)) {
                this.addChar(this.drawScoreText(cell[0]))
            } else if (this.isBorderCell(cell)) {
                this.addChar('█')
            } else if (this.isSnakeCell(cell)) {
                this.addChar('█')
            } else if (this.isAppleCell(cell)) {
                this.addChar('█')
            } else {
                this.addChar(' ')
            }

            if (cell[0] === this.screenWidth - 1) this.addChar('\n')
        }
    }

    private update(): void {
        console.clear()
        this._snake.update()
        this._apple.update()
        this.drawScreen()
        console.log(this._screen.join(''))
    }

    run(): void {
        if (!this._interval) {
            this._interval = setInterval(() => {
                this.update()
            }, 100)
        } else {
            this._interval = undefined
        }
    }
}
