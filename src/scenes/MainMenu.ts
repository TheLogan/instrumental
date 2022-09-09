import Phaser from 'phaser'
import { images } from '../Utilities/assets'

export default class MainMenu extends Phaser.Scene {
  constructor() {
    super('MainMenu');
  }

  create() {
    // console.log('creating')
    const logo = this.add.image(
      this.game.renderer.width / 2,
      this.game.renderer.height / 4,
      images.LOGO,
    )

    this.createButton(logo, 'falling notes', 1, 'FallingNotes');
    this.createButton(logo, 'sheet music', 2, 'LearnSheetMusic');
    this.createButton(logo, 'audio analyser', 3, 'AnalyseAudio');
    this.createButton(logo, 'Piano', 4, 'PianoScene');
    this.createButton(logo, 'tuner engine', 5, 'TunerEngine');
  }

  createButton(logo: Phaser.GameObjects.Image, text: string, index: number, loadLevel: string) {
    const btnGo = this.add.image(
      this.game.renderer.width / 2,
      logo.y + 200 + (100 * index), images.BUTTON
    )

    btnGo.scale = 0.3;
    btnGo.displayWidth *= 2.5;

    let fallingBtnTxt = this.add.text(btnGo.x, btnGo.y, text, { fontSize: '44px', fontStyle: 'bold' });
    fallingBtnTxt.setOrigin(0.5, 0.5);

    btnGo.setInteractive()
    btnGo.on('pointerover', () => {
      btnGo.tint = 0x945801;
    })
    btnGo.on('pointerout', () => {
      btnGo.clearTint()
    })
    btnGo.on('pointerup', () => this.scene.start(loadLevel));
  }
}
