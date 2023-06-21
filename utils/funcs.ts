import { Matrix } from 'xirtam'

export function createCells(width: number, height: number) {
    const cells = new Matrix<Cell>()

    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) cells.push([col, row])
    }

    return cells
}
