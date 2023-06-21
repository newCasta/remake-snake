import { Game } from './classes/game.ts'
import { HEIGHT, WIDTH } from './config/constants.ts'

const game = new Game({
    width: WIDTH,
    height: HEIGHT
})

if (import.meta.main) {
    game.run()
}
