import Phaser from 'phaser';
import TunerEngine from '../Utilities/TunerEngine';
import { notes } from '../Utilities/Constants';
import { svgs } from '../Utilities/assets';

export default class TunerScene extends Phaser.Scene {
  constructor() {
    super('TunerScene');
  }

  // textClosestNote?: Phaser.GameObjects.Text;
  tunerEngine?: TunerEngine;
  gauge?: {
    bg:Phaser.GameObjects.Image,
    noteText: Phaser.GameObjects.Text,
    arrow: Phaser.GameObjects.Container
  };

  create() {
    console.log('init');
    var div = document.getElementById('game');
    if(div) div.style.backgroundColor = "#404040";
    else console.log('no div')

    this.buildGauge();
    this.tunerEngine = new TunerEngine();
  }

  buildGauge(){
    const screenX = this.renderer.width / 2;
    const screenY = this.renderer.height / 2 + 100;

    const bg = this.add.image(screenX, screenY, svgs.GAUGE);
    bg.scale = 1.5;
    const arrow = this.add.rectangle(0,-140, 20, 200, 0x000);
    const noteText = this.add.text(screenX, screenY + 30, '', { fontSize: '128px'});
    this.gauge = {
      bg,
      noteText,
      arrow: this.add.container(screenX, screenY, arrow),
    };
  }


  update() {
    const freq = this.tunerEngine?.getFreq();

    if(freq == null || freq < 5) {
      return;
    }

    const closest = notes.reduce(function (prev, curr) {
      return (Math.abs(curr.freq - freq) < Math.abs(prev.freq - freq) ? curr : prev);
    });
    const closestIndex = notes.findIndex(x => x.freq === closest.freq);


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

    this.gauge.arrow.angle = percent;
    this.gauge.noteText.text = closest.note;

  }
}

