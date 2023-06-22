import { Game } from './classes/game.ts'
import { HEIGHT, WIDTH } from './config/constants.ts'

const game = new Game({
    screenWidth: WIDTH,
    screenHeight: HEIGHT
})

if (import.meta.main) {
    game.run()
}
