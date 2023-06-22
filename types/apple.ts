import type { Game } from '../classes/game.ts'
import type { Snake } from '../classes/snake.ts'

export interface AppleSettings {
    snake: Snake
    game: Game
}
