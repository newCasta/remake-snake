import { Matrix } from 'xirtam'
import { AppleSettings } from '../types/apple.ts'

export class Apple {
    private _snake
    private _game
    private _screenWidth
    private _screenHeight
    private _position

    constructor(settings: AppleSettings) {
        this._snake = settings.snake
        this._game = settings.game
        this._screenWidth = this._game.screenWidth
        this._screenHeight = this._game.screenHeight
        this._position = this.place()
    }

    get position(): Cell {
        return this._position
    }

    private get randomPosition(): Cell {
        const col = Math.floor(Math.random() * (this._screenWidth - 2)) + 1
        const row = Math.floor(Math.random() * (this._screenHeight - 2)) + 1

        return [col, row]
    }

    private place(): Cell {
        let position = this.randomPosition

        while (this._snake.hasItem(position)) {
            position = this.randomPosition
        }

        return position
    }

    private collision(): void {
        if (Matrix.compare(this._snake.head, this._position)) {
            this._position = this.place()
            this._snake.setHasEaten = true
            this._game.incrementScore()
        }
    }

    update() {
        this.collision()
    }
}
