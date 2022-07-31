import Phaser, { GameObjects } from 'phaser'
import { images } from '../Utilities/assets';
import { SimpleScale } from '../Music/SimpleScale';
import { notes } from '../Utilities/Constants';

export default class LearnSheetMusic extends Phaser.Scene {
  constructor() { super('LearnSheetMusic') }

  sheetNotes: GameObjects.Image[] = [];

  create() {
    let graphics = this.add.graphics();
    graphics.fillGradientStyle(0xfff6de, 0xffeebf, 0xffeebf, 0xffde82);
    graphics.fillRect(0, 0, this.renderer.width, this.renderer.height);
    let barsY = this.renderer.width / 10;
    const fBar = this.add.rectangle(this.renderer.width / 2, barsY, this.renderer.width - 100, 2, 0x000000);
    const dBar = this.add.rectangle(this.renderer.width / 2, barsY + 16, this.renderer.width - 100, 2, 0x000000);
    const bBar = this.add.rectangle(this.renderer.width / 2, barsY + 32, this.renderer.width - 100, 2, 0x000000);
    const gBar = this.add.rectangle(this.renderer.width / 2, barsY + 48, this.renderer.width - 100, 2, 0x000000);
    const eBar = this.add.rectangle(this.renderer.width / 2, barsY + 64, this.renderer.width - 100, 2, 0x000000);
    let clef = this.add.image(100, barsY + 30, images.TREBLECLEF);
    clef.scale = 0.3;

    for (const [index, note] of SimpleScale.notes.entries()) {
      const x = 150 + 50 * index;

      let y = 0;
      let reverse = false;
      switch (note.note) {
        case notes.D4:
          y = eBar.y + 8;
          // this.add.rectangle(x, y, 40, 2, 0x000000);
          break;
        case notes.E4:
          y = eBar.y;
          break;
        case notes.F4:
          y = eBar.y - 8;
          break;
        case notes.G4:
          y = gBar.y;
          break;
        case notes.A5:
          y = gBar.y - 8;
          break;
        case notes.B5:
          y = bBar.y;
          break;
        case notes.C5:
          y = bBar.y - 8;
          reverse = true;
          break;
        case notes.D5:
          y = dBar.y;
          reverse = true;
          break;
      }

      let currentNote = this.add.image(x, y, images.NOTE);
      if (reverse) {
        currentNote.rotation = Math.PI;
      }
      currentNote.scale = 0.13;
      this.sheetNotes.push(currentNote);
    }
  }
  update() {

  }
}