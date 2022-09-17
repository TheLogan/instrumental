import Phaser from 'phaser'
// import OdeToJoy from "../Music/OdeToJoy.json";
import music from "../Music/SmokeOnTheWater.json";
import { notesOld, noteLength, notes } from '../Utilities/Constants';
import { dotLength, tieLength } from '../Utilities/MusicMath';
// import Pitcher from '../Utilities/Pitcher';
import PitcherSampler from '../Utilities/PitcherSampler';



export default class PianoScenePitcher extends Phaser.Scene {
  audioContex = new AudioContext();
  tempo = 100;

  pitcher = new PitcherSampler();
  ovtNumber = 2;

  constructor() {
    super('PianoScenePitcher');
  }

  create = () => {
    this.playMelody(music);
  }

  playMelody = (music:any) => {
    const musicNotes: { timestamp: number, note: string, length: number }[] = [];
    this.tempo = music['metronome mark'];

    let skipCount = 0;
    for (const [index, event] of music.events.entries()) {
      if (skipCount > 0) {
        skipCount--;
        continue;
      }
      if (event.type === 'note') {
        let length = noteLength[event.length];
        if (event.relations?.dot) {
          length = dotLength(length);
        }
        if (event.relations?.tie) {
          skipCount = event.relations.tie;
          const tiedNotes = music.events.slice(index + 1, index + event.relations.tie + 1);
          const tiedLengths = tiedNotes.map((x:any) => noteLength[x.length]);

          length = tieLength(length, tiedLengths);
        }
        const lastTimestamp = musicNotes[musicNotes.length - 1]?.timestamp || 0;
        const lastLength = musicNotes[musicNotes.length - 1]?.length || 0;

        const timestamp = lastTimestamp + lastLength * 1000;
        musicNotes.push({ timestamp, note: event.note, length });
      }
    }
    console.log('notes', musicNotes)

    let musicTime = 0;
    let musicInterval = setInterval(() => {
      musicTime += 10;
      if (musicNotes.length > 0 && musicNotes[0].timestamp <= musicTime) {
        let currentNote = musicNotes.shift();
        if (!currentNote) return;
        // this.pitcher.playPitch(notesOld[currentNote.note], this.ovtNumber, currentNote.length);
        let midi = notes.find(note => currentNote && note.note === currentNote.note)?.midi;
        if (!midi) return;
        this.pitcher.playSample(midi, currentNote.length);
      } else if (musicNotes.length <= 0) {
        clearInterval(musicInterval);
      }
    }, 10);
  }
}