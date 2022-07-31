import Phaser from 'phaser'
import { images } from '../Utilities/assets'
export default class Loader extends Phaser.Scene {
  constructor() {
    super('Loader')
  }
  preload() {
    for (const key in images) {
      if (Object.prototype.hasOwnProperty.call(images, key)) {
        this.load.image(images[key])
      }
    }

    let loadingBar = this.add.graphics({
      fillStyle: {
        color: 0xff0000,
      },
    })

    this.load.on('progress', (percent: number) => {
      loadingBar.fillRect(
        0,
        this.game.renderer.height / 2,
        this.game.renderer.width * percent,
        50,
      )
    })
  }

  create() {
    this.scene.start('MainMenu')
  }
}
