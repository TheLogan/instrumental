import Phaser from 'phaser'
import OdeToJoy from "../Music/OdeToJoy.json";
import { notes, noteLength } from '../Utilities/Constants';
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
    const frequency = notes[note];
    const gainNode = this.audioContex.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.value = frequency; // value in hertz
    console.log('frequency', frequency)
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContex.destination)
    gainNode.gain.setTargetAtTime(0, this.audioContex.currentTime + duration - 0.075, 0.015);
    oscillator.start();
    oscillator.stop(this.audioContex.currentTime + duration);
  }

  playMelody = () => {
    const notes: { timestamp: number, note: string, length: number }[] = [];
    this.tempo = OdeToJoy['metronome mark'];

    for (const event of OdeToJoy.events) {
      if (event.type === 'note') {
        let length = noteLength[event.length];
        if (event.relations?.dot) {
          length = dotLength(length);
        }
        const lastTimestamp = notes[notes.length - 1]?.timestamp || 0;
        const lastLength = notes[notes.length - 1]?.length || 0;

        const timestamp = lastTimestamp + lastLength * 1000; // USes the wrong timestap, needs to use the previous nodes length
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