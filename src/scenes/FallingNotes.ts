import Phaser from 'phaser'
import { images } from '../Utilities/assets';
import { SimpleScale } from '../Music/SimpleScale';

export default class FallingNotes extends Phaser.Scene {
  constructor() {
    super('FallingNotes')
  }

  colorArr = [
    0xFFEAA6,
    0xDE9571,
    0xF59FD3,
    0x94D4F6
  ]

  noteCountdown = 0;
  noteIndex = -1;
  staff?: Phaser.GameObjects.Rectangle = undefined;

  noteArr: { go: Phaser.GameObjects.Image, meta: any }[] = [];
  octaveWidth = 0;
  create() {
    this.octaveWidth = this.game.renderer.width / 4;
    for (let i = 0; i < 4; i++) {
      this.add.rectangle(i * this.octaveWidth + this.octaveWidth / 2,
        this.game.renderer.height / 2,
        this.octaveWidth,
        this.game.renderer.height,
        this.colorArr[i]
      );

      this.staff = this.add.rectangle(
        this.game.renderer.width / 2,
        this.game.renderer.height - 150,
        this.game.renderer.width, 10,
        0x000000
      )
      this.staff.depth = 100;
    }
  }

  nextTone = (delta: number) => {
    if (this.noteCountdown <= 0) {
      const nextNote = SimpleScale.notes[++this.noteIndex];
      if (!nextNote) return;

      // TODO: FIND THE CORRECT SWIMLANE
      const x = (this.octaveWidth * nextNote.string) + (this.octaveWidth / 2);
      let noteGo = this.add.image(x, 0, images.NOTE);
      noteGo.scale = 0.25;
      this.noteArr.push({
        go: noteGo,
        meta: {
          string: nextNote.string
        }
      });
      this.noteCountdown = nextNote.length * 1000

      this.tweens.add({
        targets: noteGo,
        y: this.game.renderer.height + noteGo.height,
        duration: 3500,
        ease: 'Sine.in',
        yoyo: false,
        repeat: 0,
      });
    } else {
      this.noteCountdown -= delta;
    }
  }

  update(time: number, delta: number): void {
    this.nextTone(delta);
    let key1 = this.input.keyboard.addKey('ONE');
    let key2 = this.input.keyboard.addKey('TWO');
    let key3 = this.input.keyboard.addKey('THREE');
    let key4 = this.input.keyboard.addKey('FOUR');

    for (const [index, note] of this.noteArr.entries()) {
      if (!this.staff) return;
      if (note.go.y < this.staff.y + 50 && note.go.y > this.staff.y - 50) {
        if (key1.isDown && note.meta.string === 0) {
          note.go.destroy();
          this.noteArr.splice(index, 1);
        }
        else if (key2.isDown && note.meta.string === 1) {
          note.go.destroy();
          this.noteArr.splice(index, 1);
        }
        else if (key3.isDown && note.meta.string === 2) {
          note.go.destroy();
          this.noteArr.splice(index, 1);
        }
        else if (key4.isDown && note.meta.string === 3) {
          note.go.destroy();
          this.noteArr.splice(index, 1);
        }
      }
    }

  }
}
