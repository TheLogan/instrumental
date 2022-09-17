import Phaser from 'phaser';
import TunerEngine from '../Utilities/TunerEngine';
import { notes } from '../Utilities/Constants';

export default class TunerScene extends Phaser.Scene {
  constructor() {
    super('TunerScene');
  }

  textClosestNote?: Phaser.GameObjects.Text;
  // textFreq?: Phaser.GameObjects.Text;
  tunerEngine?: TunerEngine;
  gauge?: {bg:Phaser.GameObjects.Arc, arrow: Phaser.GameObjects.Container};

  create() {
    console.log('init');
    this.buildGauge();
    this.textClosestNote = this.add.text(this.renderer.width / 2, this.renderer.height / 2, '', { fontSize: '128px'});
    // this.textFreq = this.add.text(this.textClosestNote.x, this.textClosestNote.y + 200, '', { fontSize: '32px'})
    this.tunerEngine = new TunerEngine();
  }

  buildGauge(){
    const screenX = this.renderer.width / 2;
    const screenY = this.renderer.height / 2 + 100;

    const bg = this.add.circle(screenX, screenY, 230, 0x979797);
    const arrow = this.add.rectangle(0,-100, 20, 200, 0x000)
    this.gauge = {
      bg,
      arrow: this.add.container(screenX, screenY, arrow),
    };
  }


  update() {
    if (!this.textClosestNote)return;
    const freq = this.tunerEngine?.getFreq();

    if(freq == null || freq < 5) {
      return;
    }

    const closest = notes.reduce(function (prev, curr) {
      return (Math.abs(curr.freq - freq) < Math.abs(prev.freq - freq) ? curr : prev);
    });
    const closestIndex = notes.findIndex(x => x.freq === closest.freq);

    this.textClosestNote.text = closest.note;

    let secondClosest;
    if(closest.freq > freq) {
      secondClosest = notes[closestIndex -1];
      if(secondClosest?.freq === closest.freq) secondClosest = notes[closestIndex -2];
    } else {
      secondClosest = notes[closestIndex +1];
      if(secondClosest?.freq === closest.freq) secondClosest = notes[closestIndex +2];
    }
    if(!secondClosest || !this.gauge) return;

    let totalDiff = Math.abs(secondClosest.freq - closest.freq);

    let diff = closest.freq - freq;
    let percent = diff/totalDiff * -100;
    console.log('secondClosest', secondClosest.freq, 'closest', closest.freq, 'percent', percent);
    console.log('freq', freq, 'diff', diff, 'totalDiff', totalDiff)

    // this.textFreq.text = percent.toFixed(2) + "%";
    // calculate position from 0 to 90
    this.gauge.arrow.angle = percent;
  }
}

