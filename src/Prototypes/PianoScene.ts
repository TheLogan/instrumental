import Phaser from 'phaser'

export default class PianoScene extends Phaser.Scene {
  audioContex = new AudioContext();
  tempo = 100;

  constructor() {
    super('PianoScene');
  }

  create = () => {
    this.playMelody();
  }



  playNote = (frequency: number, duration: number, callback: () => void) => {
    // create Oscillator node
    var oscillator = this.audioContex.createOscillator();

    oscillator.type = 'square';
    oscillator.frequency.value = frequency; // value in hertz
    oscillator.connect(this.audioContex.destination);
    oscillator.onended = callback;
    oscillator.start(0);
    oscillator.stop(this.audioContex.currentTime + duration);
  }


  playMelody = () => {
    if (this.notes.length > 0) {
      let note = this.notes.shift();
      if (!note) return;
      this.playNote(note[0], 256 / (note[1] * this.tempo), this.playMelody);
    }
  }

  notes = [
    [659, 4],
    [659, 4],
    [659, 4],
    [523, 8],
    [0, 16],
    [783, 16],
    [659, 4],
    [523, 8],
    [0, 16],
    [783, 16],
    [659, 4],
    [0, 4],
    [987, 4],
    [987, 4],
    [987, 4],
    [1046, 8],
    [0, 16],
    [783, 16],
    [622, 4],
    [523, 8],
    [0, 16],
    [783, 16],
    [659, 4]
  ];


}