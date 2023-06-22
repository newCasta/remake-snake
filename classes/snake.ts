import { DIRECTIONS } from '../config/constants.ts'
import { Matrix } from 'xirtam'
import { keypress } from 'keypress'

export class Snake {
    private _body
    private _screenWidth
    private _screenHeight
    private _hasEaten
    private _hasLose
    private _direction
    private _isInputLoaded
    private _directionHasChanged
    private _tail?: Cell

    constructor(settings: SnakeSettings) {
        this._body = new Matrix(settings.position)
        this._screenWidth = settings.screenWidth
        this._screenHeight = settings.screenHeight
        this._hasEaten = false
        this._hasLose = false
        this._direction = DIRECTIONS.LEFT
        this._isInputLoaded = false
        this._directionHasChanged = false
    }

    get hasLose(): boolean {
        return this._hasLose
    }

    get head(): Cell {
        return this._body[0]
    }

    private get isTouchingBorder(): boolean {
        const head = this.head
        const isUp = head[0] <= 0 || head[0] >= this._screenWidth - 1
        const isDown = head[1] <= 0 || head[1] >= this._screenHeight

        return isUp || isDown
    }

    private get isTouchingBody(): boolean {
        return this._body.some(
            (bodyPart, i) => i > 0 && Matrix.compare(this.head, bodyPart)
        )
    }

    set setHasEaten(ate: boolean) {
        this._hasEaten = ate
    }

    private set setDirectionHasChanged(directionChanged: boolean) {
        this._directionHasChanged = directionChanged
    }

    hasItem(item: Cell): boolean {
        return this._body.hasItem(item)
    }

    private addTail(tail: Cell): void {
        this._body.push(tail)
    }

    private addBodyPart(bodyPart: Cell): void {
        this._body.unshift(bodyPart)
    }

    private removeBodyPart(): Cell {
        return this._body.pop()!
    }

    private movement(): void {
        const oldHead = this.head
        const direction = this._direction
        const headX = oldHead[0] + direction[0]
        const headY = oldHead[1] + direction[1]
        const head = [headX, headY] satisfies Cell

        this.addBodyPart(head)

        if (!this._hasEaten) this._tail = this.removeBodyPart()

        this.setHasEaten = false
    }

    private detectInput(headDirection: HeadDirection, key?: string): boolean {
        const direction = this._direction
        const bodySize = this._body.length

        const directions = {
            up:
                (key === 'up' || key === 'w') &&
                (bodySize === 1 || direction[1] !== 1),
            down:
                (key === 'down' || key === 's') &&
                (bodySize === 1 || direction[1] !== -1),
            left:
                (key === 'left' || key === 'a') &&
                (bodySize === 1 || direction[0] !== 1),
            right:
                (key === 'right' || key === 'd') &&
                (bodySize === 1 || direction[0] !== -1)
        }

        return directions[headDirection]
    }

    private changeDirection(direction: keyof typeof DIRECTIONS): void {
        if (Object.hasOwn(DIRECTIONS, direction)) {
            this._directionHasChanged = true
            this._direction = DIRECTIONS[direction]
        }
    }

    private input(): void {
        this._isInputLoaded = true

        keypress().addEventListener('keydown', e => {
            if (!this._directionHasChanged) {
                if (this.detectInput('up', e.key)) {
                    this.changeDirection('UP')
                } else if (this.detectInput('down', e.key)) {
                    this.changeDirection('DOWN')
                } else if (this.detectInput('left', e.key)) {
                    this.changeDirection('LEFT')
                } else if (this.detectInput('right', e.key)) {
                    this.changeDirection('RIGHT')
                }
            }
        })
    }

    private removeInput(): void {
        keypress().dispose()
    }

    private collisions(): void {
        if (this.isTouchingBody || this.isTouchingBorder) {
            if (this._tail) this.addTail(this._tail)

            this._hasLose = true
            this._isInputLoaded = false

            this.removeInput()
        }
    }

    update(): void {
        if (!this._isInputLoaded) this.input()

        this.movement()
        this.collisions()

        if (this._directionHasChanged) this.setDirectionHasChanged = false
    }
}
