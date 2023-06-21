import { Game } from '../classes/game.ts'

export interface SnakeSettings {
    pos: Cell
    game: Game
}

export type HeadDirection = 'up' | 'down' | 'left' | 'right'
