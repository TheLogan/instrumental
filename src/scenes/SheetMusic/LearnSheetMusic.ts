import Phaser, { GameObjects, Tweens } from 'phaser'
import { svgs } from '../../Utilities/assets';
import OpenString from '../../Music/Violin/OpenString.json';
// import OdeToJoy from "../../Music/OdeToJoy.json";
import { notes, notesShort } from '../../Utilities/Constants';
import { renderMeta } from './Helpers';
import TunerEngine from '../../Utilities/TunerEngine';
import { getNoteByFreq } from '../../Utilities/MusicMath';

export default class LearnSheetMusic extends Phaser.Scene {
  constructor() { super('LearnSheetMusic') }

  sheetNotes: { go: GameObjects.Image, note: number, decorators?: any[] }[] = [];
  tunerEngine: TunerEngine = new TunerEngine();

  create() {
    const topBarY = this.renderer.width / 10;
    const bottomBarIndex = 16;
    const bottomY = topBarY + 8 * 8;
    renderMeta(this, topBarY);

    const baseIndex = notesShort.findIndex(x => x.note === "F5");
    for (const [index, note] of OpenString.events.entries()) {
      const x = 150 + 100 * index;
      let y = topBarY;
      const decorators: any[] = [];

      // top bar = F5
      const currentIndex = notesShort.findIndex(x => x.note === note.note);
      if (!currentIndex) return; //TODO: Handle error

      const basedIndex = baseIndex - currentIndex;
      y = topBarY + (basedIndex * 8);
      let currentNote = this.add.image(x, y, svgs[note.duration]);
      currentNote.scale = 0.75;
      this.add.text(x, y, note.note).setOrigin(0.5);

      if (currentIndex > bottomBarIndex) {
        let bottomIndex = currentIndex - 8;
        for (let i = 0; i < currentIndex - bottomIndex; i++) {
          if (i % 2 === 0) {
            decorators.push(this.add.rectangle(x, bottomY + i * 8, 40, 2, 0x000000));
          }
        }
      }
    }
  }
  update() {
    if (this.sheetNotes.length <= 0 || !this.sheetNotes[0]) return;
    const freq = this.tunerEngine.getFreq();
    const closest = getNoteByFreq(freq);

    // if (closest.note)

  }

  // compareTone = (sheetNotes: { go: GameObjects.Image, note: number, decorators?: any[] }[]) => {
  //   const currentNote = sheetNotes.shift();
  //   if (!currentNote) return;

  //   this.tweens.add({
  //     targets: currentNote.go,
  //     y: this.game.renderer.height,
  //     duration: 1500,
  //     ease: 'Sine.in',
  //     yoyo: false,
  //     repeat: 0,
  //     alpha: { value: 0, duration: 300, ease: 'Power1', delay: 500 },
  //     onComplete: () => currentNote.go.destroy()
  //   });

  //   if (currentNote.decorators && currentNote.decorators.length > 0) {
  //     for (const decorator of currentNote.decorators) {
  //       this.tweens.add({
  //         targets: decorator,
  //         // y: this.game.renderer.height,
  //         duration: 600,
  //         ease: 'Sine.in',
  //         yoyo: false,
  //         repeat: 0,
  //         alpha: { value: 0, duration: 500, ease: 'Power1', delay: 100 },
  //         onComplete: () => decorator.destroy()
  //       });
  //     }
  //   }
  // }
}