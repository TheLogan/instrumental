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
    noteText: {
      bg: Phaser.GameObjects.Rectangle,
      text: Phaser.GameObjects.Text,
    },
    arrow: Phaser.GameObjects.Container
  };

  create() {
    console.log('init');
    var div = document.getElementById('game');
    if(div) div.style.backgroundColor = "#404040";
    else console.log('no div')

    this.add.text(this.renderer.width / 2, 130, 'Tuner', {fontSize: '200px', fontFamily: 'Helvetica'}).setOrigin(0.5);

    this.buildGauge();
    this.tunerEngine = new TunerEngine();
  }

  buildGauge(){
    const screenX = this.renderer.width / 2;
    const screenY = this.renderer.height / 2 + 100;

    const bg = this.add.image(screenX, screenY, svgs.GAUGE);
    const arrow = this.add.rectangle(0,-105, 10, 150, 0x000);
    this.gauge = {
      bg,
      noteText: {
        bg: this.add.rectangle(screenX, screenY + 60, 200, 100, 0x353535),
        text: this.add.text(screenX, screenY + 60, '--', { fontSize: '100px' }).setOrigin(0.5),

      },
      arrow: this.add.container(screenX, screenY, arrow),
    };

    this.gauge.noteText.bg.setStrokeStyle(2, 0x303030);
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

    this.gauge.arrow.angle = percent;
    this.gauge.noteText.text.text = closest.note;
  }
}

