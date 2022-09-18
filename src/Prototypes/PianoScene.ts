import Phaser from 'phaser'
import OdeToJoy from "../Music/OdeToJoy.json";
import { notesOld, noteLength } from '../Utilities/Constants';
import { dotLength } from '../Utilities/MusicMath';

export default class PianoScene extends Phaser.Scene {
  audioContex = new AudioContext();
  tempo = 100;

  constructor() {
    super('PianoScene');
  }

  create = () => {
    this.playMelody();
  }

  playNote = (note: string, duration: number) => {
    // create Oscillator node
    const oscillator = this.audioContex.createOscillator();
    const frequency = notesOld[note];
    const gainNode = this.audioContex.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.value = frequency; // value in hertz
    console.log('frequency', frequency)
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContex.destination)
    gainNode.gain.setTargetAtTime(0, this.audioContex.currentTime + duration - 0.075, 0.015);

    let sineTerms = new Float32Array([0.5, 0.4, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.7, 0.5]);
    let cosineTerms = new Float32Array(sineTerms.length);
    let customWaveform = this.audioContex.createPeriodicWave(cosineTerms, sineTerms);
    oscillator.setPeriodicWave(customWaveform);


    oscillator.start();
    oscillator.stop(this.audioContex.currentTime + duration);
  }

  playMelody = () => {
    const notes: { timestamp: number, note: string, length: number }[] = [];
    this.tempo = OdeToJoy['metronome mark'];

    for (const event of OdeToJoy.events) {
      if (event.type === 'note') {
        let length = noteLength[event.duration];
        if (event.relations?.dot) {
          length = dotLength(length);
        }
        const lastTimestamp = notes[notes.length - 1]?.timestamp || 0;
        const lastLength = notes[notes.length - 1]?.length || 0;

        const timestamp = lastTimestamp + lastLength * 1000;
        notes.push({ timestamp, note: event.note, length });
      }
    }
    console.log('notes', notes)

    let musicTime = 0;
    let musicInterval = setInterval(() => {
      musicTime += 10;
      if (notes.length > 0 && notes[0].timestamp <= musicTime) {
        let currentNote = notes.shift();
        if (!currentNote) return;
        this.playNote(currentNote.note, currentNote.length);
      } else if (notes.length <= 0) {
        clearInterval(musicInterval);
      }
    }, 10);
  }
}