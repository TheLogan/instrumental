import Phaser from 'phaser'
// import OdeToJoy from "../Music/OdeToJoy.json";
import music from "../Music/SmokeOnTheWater.json";
import { notesOld, noteLength as noteDuration, notes } from '../Utilities/Constants';
import { dotLength, tieLength } from '../Utilities/MusicMath';
// import Pitcher from '../Utilities/Pitcher';
import PitcherSampler from '../Utilities/PitcherSampler';



export default class PianoScenePitcher extends Phaser.Scene {
  audioContex = new AudioContext();
  tempo = 100;

  pitcher = new PitcherSampler();

  constructor() {
    super('PianoScenePitcher');
  }

  create = () => {
    this.playMelody(music);
  }

  playMelody = (music: any) => {
    const musicNotes: { timestamp: number, note: string, duration: number }[] = [];
    this.tempo = music['metronome mark'];

    let skipCount = 0;
    for (const [index, event] of music.events.entries()) {
      if (skipCount > 0) {
        skipCount--;
        continue;
      }
      if (event.type === 'note') {
        let duration = noteDuration[event.duration];
        if (event.relations?.dot) {
          duration = dotLength(duration);
        }
        if (event.relations?.tie) {
          skipCount = event.relations.tie;
          const tiedNotes = music.events.slice(index + 1, index + event.relations.tie + 1);
          const tiedDuration = tiedNotes.map((x: any) => noteDuration[x.duration]);

          duration = tieLength(duration, tiedDuration);
        }
        const lastTimestamp = musicNotes[musicNotes.length - 1]?.timestamp || 0;
        const lastLength = musicNotes[musicNotes.length - 1]?.duration || 0;

        const timestamp = lastTimestamp + lastLength * 1000;

        // if(musicNotes[musicNotes.length - 1].note == "rest") {
        //   console.log('lastTimestamp', lastTimestamp);
        //   console.log('lastLength', lastLength);
        //   console.log('timestamp', timestamp);
        // }

        musicNotes.push({ timestamp, note: event.note, duration });
      }
      if (event.type === 'rest') {
        const lastTimestamp = musicNotes[musicNotes.length - 1]?.timestamp || 0;
        const lastDuration = musicNotes[musicNotes.length - 1]?.duration || 0;
        const timestamp = lastTimestamp + lastDuration * 1000;

        musicNotes.push({ timestamp, note: "rest", duration: noteDuration[event.duration] });

      }
    }
    let newMusicNotes = [...musicNotes];
    console.log('notes', newMusicNotes);

    let musicTime = 0;
    let musicInterval = setInterval(() => {
      if (musicNotes.length <= 0) {
        clearInterval(musicInterval);
        return;
      }
      musicTime += 10;
      if (musicNotes[0].note != "rest" && musicNotes[0].timestamp <= musicTime) {
        let currentNote = musicNotes.shift();
        if (!currentNote) return;
        let midi = notes.find(note => currentNote && note.note === currentNote.note)?.midi;
        if (!midi) return;
        console.log('midi', midi, 'currentNote',  currentNote);
        
        this.pitcher.playSample(midi, currentNote.duration);
      } else if (musicNotes[0].note === 'rest') {
        let currentNote = musicNotes.shift();
      }
    }, 10);
  }
}