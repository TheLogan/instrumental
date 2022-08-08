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
  
  playNote = (frequency: number, duration: number) => {
    console.log('frequency', frequency, 'duration', duration)
    const oscillator = this.audioContex.createOscillator();
    oscillator.type = 'square';
    oscillator.frequency.value = frequency;
    oscillator.connect(this.audioContex.destination);
    oscillator.start();
    
  setTimeout(
    () => {
      oscillator.stop();
      this.playMelody();
    }, duration);
  }

  playMelody = () => {
    if (this.notes.length > 0) {
      let note = this.notes.shift();
      if(!note) return;
      
      this.playNote(note[0], 1000 * 256 / (note[1] * this.tempo));
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