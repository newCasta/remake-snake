import { createCells } from '../utils/funcs.ts'

export const WIDTH = 42
export const HEIGHT = 22
export const CELLS = createCells(WIDTH, HEIGHT)

export const INITIAL_POS = [
    Math.floor(WIDTH / 2),
    Math.floor(HEIGHT / 2)
] satisfies Cell

export const DIRECTIONS = {
    LEFT: [-1, 0],
    RIGHT: [1, 0],
    UP: [0, -1],
    DOWN: [0, 1]
} satisfies Directions
