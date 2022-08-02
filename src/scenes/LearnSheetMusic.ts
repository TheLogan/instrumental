import Phaser, { GameObjects, Tweens } from 'phaser'
import { images } from '../Utilities/assets';
// import { SimpleScale } from '../Music/SimpleScale';
import { OpenString } from '../Music/Violin/OpenString';
import { notes } from '../Utilities/Constants';

export default class LearnSheetMusic extends Phaser.Scene {
  constructor() { super('LearnSheetMusic') }

  sheetNotes: { go: GameObjects.Image, note: number }[] = [];

  create() {
    let graphics = this.add.graphics();
    graphics.fillGradientStyle(0xfff6de, 0xffeebf, 0xffeebf, 0xffde82);
    graphics.fillRect(0, 0, this.renderer.width, this.renderer.height);
    let barsY = this.renderer.width / 10;
    // draws the horizontal bars
    const fBar = this.add.rectangle(this.renderer.width / 2, barsY, this.renderer.width - 100, 2, 0x000000);
    const dBar = this.add.rectangle(this.renderer.width / 2, barsY + 16, this.renderer.width - 100, 2, 0x000000);
    const bBar = this.add.rectangle(this.renderer.width / 2, barsY + 32, this.renderer.width - 100, 2, 0x000000);
    const gBar = this.add.rectangle(this.renderer.width / 2, barsY + 48, this.renderer.width - 100, 2, 0x000000);
    const eBar = this.add.rectangle(this.renderer.width / 2, barsY + 64, this.renderer.width - 100, 2, 0x000000);
    let clef = this.add.image(100, barsY + 30, images.TREBLECLEF);
    clef.scale = 0.4;

    // Draws all the nodes
    for (const [index, note] of OpenString.notes.entries()) {
      const x = 150 + 100 * index;
      let y = 0;
      let reverse = false;
      switch (note.note) {
        case notes.G3:
          y = eBar.y + 40;
          this.add.rectangle(x, eBar.y + 16, 40, 2, 0x000000);
          this.add.rectangle(x, eBar.y + 32, 40, 2, 0x000000);
          break;
        case notes.D4:
          y = eBar.y + 8;
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
        case notes.A4:
          y = gBar.y - 8;
          break;
        case notes.B4:
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
        case notes.E5:
          y = dBar.y - 8;
          reverse = true;
          break;
      }

      if (index % 4 === 0 && index !== 0) {
        this.add.rectangle(x - 50, y - 8, 4, 65, 0x000000);
      }


      let currentNote = this.add.image(x, y, images.NOTE);
      if (reverse) {
        currentNote.rotation = Math.PI;
      }
      currentNote.scale = 0.13;
      this.sheetNotes.push({ go: currentNote, note: note.note });
    }

    // end bars
    this.add.rectangle(fBar.getRightCenter().x - 20, fBar.y + 32, 3, 65, 0x000000);
    this.add.rectangle(fBar.getRightCenter().x, fBar.y + 32, 10, 65, 0x000000);
  }
  update() {
    let dKey = this.input.keyboard.addKey('D');
    let eKey = this.input.keyboard.addKey('E');
    let fKey = this.input.keyboard.addKey('F');
    let gKey = this.input.keyboard.addKey('G');
    let aKey = this.input.keyboard.addKey('A');
    let bKey = this.input.keyboard.addKey('B');
    let cKey = this.input.keyboard.addKey('C');

    if (this.sheetNotes.length <= 0 || !this.sheetNotes[0]) return;

    console.log('this.sheetNotes[0].note', this.sheetNotes[0].note)
    if ((this.sheetNotes?.[0].note === notes.D4 || this.sheetNotes[0].note === notes.D5) && dKey.isDown) {
      this.compareTone(this.sheetNotes)
    }
    if (this.sheetNotes.length > 0 && this.sheetNotes?.[0].note === notes.E4 && eKey.isDown) {
      this.compareTone(this.sheetNotes)
    }
    if (this.sheetNotes.length > 0 && this.sheetNotes?.[0].note === notes.F4 && fKey.isDown) {
      this.compareTone(this.sheetNotes)
    }
    if (this.sheetNotes.length > 0 && this.sheetNotes?.[0].note === notes.G4 && gKey.isDown) {
      this.compareTone(this.sheetNotes)
    }
    if (this.sheetNotes.length > 0 && this.sheetNotes?.[0].note === notes.A5 && aKey.isDown) {
      this.compareTone(this.sheetNotes)
    }
    if (this.sheetNotes.length > 0 && this.sheetNotes?.[0].note === notes.B5 && bKey.isDown) {
      this.compareTone(this.sheetNotes)
    }
    if (this.sheetNotes.length > 0 && this.sheetNotes?.[0].note === notes.C5 && cKey.isDown) {
      this.compareTone(this.sheetNotes)
    }
  }

  compareTone = (sheetNotes: { go: GameObjects.Image, note: number }[]) => {
    const currentNote = sheetNotes.shift();
    if (!currentNote) return;

    this.tweens.add({
      targets: currentNote.go,
      y: this.game.renderer.height,
      duration: 1500,
      ease: 'Sine.in',
      yoyo: false,
      repeat: 0,
      alpha: { value: 0, duration: 300, ease: 'Power1', delay: 500 },
      onComplete: () => currentNote.go.destroy()
    });

  }
}