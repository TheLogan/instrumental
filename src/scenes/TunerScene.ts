import Phaser from 'phaser';
import TunerEngine from '../Utilities/TunerEngine';
import { notes } from '../Utilities/Constants';

export default class TunerScene extends Phaser.Scene {
  constructor() {
    super('TunerScene');
  }

  textClosestNote?: Phaser.GameObjects.Text;
  textFreq?: Phaser.GameObjects.Text;
  textArrow?: Phaser.GameObjects.Text;
  

  // textPrevNote?: Phaser.GameObjects.Text;
  // textFreq?: Phaser.GameObjects.Text;
  // textNextNote?: Phaser.GameObjects.Text;
  tunerEngine?: TunerEngine;

  create() {
    console.log('init');
    this.textClosestNote = this.add.text(this.renderer.width / 2, this.renderer.height / 2, '', { fontSize: '128px'});
    this.textFreq = this.add.text(this.textClosestNote.x, this.textClosestNote.y + 200, '', { fontSize: '32px'})
    this.textArrow = this.add.text(this.textClosestNote.x, this.textClosestNote.y - 200, '', { fontSize: '64px'})

    // this.textPrevNote = this.add.text(100, this.renderer.height / 2, '', { fontSize: '64px', align: '' });
    // this.textFreq = this.add.text(this.renderer.width / 2, this.renderer.height / 2, '', { fontSize: '64px', align: '' });
    // this.textNextNote = this.add.text(this.renderer.width - 300, this.renderer.height / 2, '', { fontSize: '64px', align: '' });
  
    this.tunerEngine = new TunerEngine();
  }


  update() {
    if (!this.textClosestNote || !this.textFreq || !this.textArrow)return;
    const freq = this.tunerEngine?.getFreq();

    if(freq == null || freq < 5) {
      return;
    }

    const closest = notes.reduce(function (prev, curr) {
      return (Math.abs(curr.freq - freq) < Math.abs(prev.freq - freq) ? curr : prev);
    });

    // const index = notes.findIndex( x=> x === closest);
    // let prevNote;
    // let nextNote;
    // if(closest.freq < freq) {
    //   prevNote = notes[index];
    //   nextNote = notes[index +1];
    // } else {
    //   prevNote = notes[index -1];
    //   nextNote = notes[index];
    // }

    // if(!prevNote || !nextNote) return;


    this.textClosestNote.text = closest.note;
    this.textFreq.text = freq.toFixed(2);
    if(closest.freq > freq) {
      this.textArrow.text = "->";
    } else {
      this.textArrow.text = "<-"
    }
    
    // this.textPrevNote.text = prevNote.note + '\n' + prevNote.freq;
    // this.textFreq.text = freq.toFixed(2);
    // this.textNextNote.text = nextNote.note + '\n' + nextNote.freq;
  }
}

