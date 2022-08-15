import Phaser, { GameObjects, Tweens } from 'phaser'
import { svgs } from '../../Utilities/assets';
// import { OpenString } from '../../Music/Violin/OpenString';
import OdeToJoy from "../../Music/OdeToJoy.json";
import { notes, notesShort } from '../../Utilities/Constants';
import { renderMeta } from './Helpers';

export default class LearnSheetMusic extends Phaser.Scene {
  constructor() { super('LearnSheetMusic') }

  sheetNotes: { go: GameObjects.Image, note: number, decorators?: any[] }[] = [];

  create() {
    const topBarY = this.renderer.width / 10;
    const bottomBarIndex = 16;
    const bottomY = topBarY + 8 * 8;
    renderMeta(this, topBarY);

    // let currentNote = this.add.image(250, topBarY, svgs.NOTES_HALF);

    const baseIndex = notesShort.findIndex(x => x.note === "F5");
    for (const [index, note] of OdeToJoy.events.entries()) {
      // for (const [index, note] of [{ "type": "note", "note": "E5", "length": "1/4" },].entries()) {
      const x = 150 + 100 * index;
      let y = topBarY;
      const decorators: any[] = [];

      // top bar = F5
      const currentIndex = notesShort.findIndex(x => x.note === note.note);
      if (!currentIndex) return; //TODO: Handle error

      const basedIndex = baseIndex - currentIndex;
      // console.log('basedIndex', basedIndex);
      y = topBarY + (basedIndex * 8);
      // console.log('y', y);
      let currentNote = this.add.image(x, y, svgs[note.length]);
      currentNote.scale = 0.75;

      if (currentIndex > bottomBarIndex) {
        // console.log('currentIndex', currentIndex, 'bottomBarIndex', bottomBarIndex)
        let bottomIndex = currentIndex - 8;
        console.log('bottomIndex', bottomIndex, currentIndex)
        for (let i = 0; i < currentIndex - bottomIndex; i++) {
          if (i % 2 === 0) {
            decorators.push(this.add.rectangle(x, bottomY + i * 8, 40, 2, 0x000000));
          }
        }
      }
    }

    // Draws all the nodes
    // for (const [index, note] of OpenString.notes.entries()) {
    //   const x = 150 + 100 * index;
    //   let y = 0;
    //   let reverse = false;
    //   const decorators: any[] = [];
    //   switch (note.note) {
    //     case notes.G3:
    //       y = eBar.y + 40;
    //       decorators.push(this.add.rectangle(x, eBar.y + 16, 40, 2, 0x000000));
    //       decorators.push(this.add.rectangle(x, eBar.y + 32, 40, 2, 0x000000));
    //       break;
    //     case notes.D4:
    //       y = eBar.y + 8;
    //       break;
    //     case notes.E4:
    //       y = eBar.y;
    //       break;
    //     case notes.F4:
    //       y = eBar.y - 8;
    //       break;
    //     case notes.G4:
    //       y = gBar.y;
    //       break;
    //     case notes.A4:
    //       y = gBar.y - 8;
    //       break;
    //     case notes.B4:
    //       y = bBar.y;
    //       break;
    //     case notes.C5:
    //       y = bBar.y - 8;
    //       reverse = true;
    //       break;
    //     case notes.D5:
    //       y = dBar.y;
    //       reverse = true;
    //       break;
    //     case notes.E5:
    //       y = dBar.y - 8;
    //       reverse = true;
    //       break;
    //   }

    //   if (index % 4 === 0 && index !== 0) {
    //     this.add.rectangle(x - 50, y - 8, 4, 65, 0x000000);
    //   }

    //   console.log('svgs.NOTES_HALF', svgs.NOTES_HALF)
    //   let currentNote = this.add.image(x, y, svgs.NOTES_HALF);
    //   if (reverse) {
    //     currentNote.rotation = Math.PI;
    //   }
    //   // currentNote.scale = 0.13;
    //   this.sheetNotes.push({ go: currentNote, note: note.note, decorators });
    // }
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

    // console.log('this.sheetNotes[0].note', this.sheetNotes[0].note)
    // if ((this.sheetNotes?.[0].note === notes.D4 || this.sheetNotes[0].note === notes.D5) && dKey.isDown) {
    //   this.compareTone(this.sheetNotes)
    // }
    // if (this.sheetNotes.length > 0 && this.sheetNotes?.[0].note === notes.E4 && eKey.isDown) {
    //   this.compareTone(this.sheetNotes)
    // }
    // if (this.sheetNotes.length > 0 && this.sheetNotes?.[0].note === notes.F4 && fKey.isDown) {
    //   this.compareTone(this.sheetNotes)
    // }
    // if (this.sheetNotes.length > 0 && this.sheetNotes?.[0].note === notes.G3 && gKey.isDown) {
    //   this.compareTone(this.sheetNotes)
    // }
    // if (this.sheetNotes.length > 0 && this.sheetNotes?.[0].note === notes.A5 && aKey.isDown) {
    //   this.compareTone(this.sheetNotes)
    // }
    // if (this.sheetNotes.length > 0 && this.sheetNotes?.[0].note === notes.B5 && bKey.isDown) {
    //   this.compareTone(this.sheetNotes)
    // }
    // if (this.sheetNotes.length > 0 && this.sheetNotes?.[0].note === notes.C5 && cKey.isDown) {
    //   this.compareTone(this.sheetNotes)
    // }
  }

  compareTone = (sheetNotes: { go: GameObjects.Image, note: number, decorators?: any[] }[]) => {
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

    if (currentNote.decorators && currentNote.decorators.length > 0) {
      for (const decorator of currentNote.decorators) {
        this.tweens.add({
          targets: decorator,
          // y: this.game.renderer.height,
          duration: 600,
          ease: 'Sine.in',
          yoyo: false,
          repeat: 0,
          alpha: { value: 0, duration: 500, ease: 'Power1', delay: 100 },
          onComplete: () => decorator.destroy()
        });
      }
    }
  }
}