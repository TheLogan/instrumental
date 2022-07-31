import Phaser from 'phaser'

export default class Demo extends Phaser.Scene {
  constructor() {
    super('GameScene')
  }

  preload() {
    this.load.image('logo', 'assets/phaser3-logo.png')
  }

  create() {
    const logo = this.add.image(400, 70, 'logo')
    const rect = this.add.rectangle(0, 0, 25, 25, 0xff0000)
    this.tweens.add({
      targets: rect,
      y: 450,
      duration: 2500,
      ease: 'Sine.in',
      yoyo: true,
      repeat: -1,
    })
    this.tweens.add({
      targets: logo,
      y: 450,
      duration: 3500,
      ease: 'Sine.out',
      yoyo: true,
      repeat: -1,
    })
  }
}
