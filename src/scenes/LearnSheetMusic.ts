import Phaser from 'phaser'
import { images } from '../Utilities/assets';
import { SimpleScale } from '../Music/SimpleScale';

export default class LearnSheetMusic extends Phaser.Scene {
  constructor() { super('LearnSheetMusic') }

  create() {
    let graphics = this.add.graphics();
    graphics.fillGradientStyle(0xfff6de, 0xffeebf, 0xffeebf, 0xffde82);
    graphics.fillRect(0, 0, this.renderer.width, this.renderer.height);


  }
  update() { }
}