import Phaser from 'phaser'
// import OdeToJoy from "../Music/OdeToJoy.json";
import music from "../Music/SmokeOnTheWater.json";
import { noteLength as noteDuration, notes } from '../Utilities/Constants';
import { dotDuration, tieDuration } from '../Utilities/MusicMath';
// import Pitcher from '../Utilities/Pitcher';
import PitcherSampler from '../Utilities/PitcherSampler';



export default class PianoScenePitcher extends Phaser.Scene {
  // audioContex = new AudioContext();
  tempoQuarterNote = 60/music['metronome mark']*4;

  pitcher = new PitcherSampler();

  constructor() {
    super('PianoScenePitcher');
  }

  create = () => {
    this.playMelody(music);
  }

  playMelody = (music: any) => {
    const musicNotes: { timestamp: number, note: string, duration: number }[] = [];
    //this.tempo = music['metronome mark'];

    let skipCount = 0;
    for (const [index, event] of music.events.entries()) {
      if (skipCount > 0) {
        skipCount--;
        continue;
      }
      if (event.type === 'note') {
        let duration = noteDuration[event.duration]*this.tempoQuarterNote;
        if (event.relations?.dot) {
          duration = dotDuration(duration, event.relations.dot);
        }
        if (event.relations?.tie) {
          skipCount = event.relations.tie;
          const tiedNotes = music.events.slice(index + 1, index + event.relations.tie + 1);
          const tiedDuration = tiedNotes.map((x: any) => noteDuration[x.duration]*this.tempoQuarterNote);

          duration = tieDuration(duration, tiedDuration);
        }
        const lastTimestamp = musicNotes[musicNotes.length - 1]?.timestamp || 0;
        const lastLength = musicNotes[musicNotes.length - 1]?.duration || 0;

        const timestamp = lastTimestamp + lastLength;

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
        const timestamp = lastTimestamp + lastDuration;

        musicNotes.push({ timestamp, note: "rest", duration: noteDuration[event.duration]*this.tempoQuarterNote });

      }
    }
    let newMusicNotes = [...musicNotes];
    console.log('notes', newMusicNotes);

    for (const currentNote of musicNotes) {
      console.log(currentNote)
      let midi = notes.find(note => currentNote && note.note === currentNote.note)?.midi;
      if (!midi) continue;
      this.pitcher.playSample(midi, currentNote.duration, currentNote.timestamp);
    }


  //  let musicTime = 0;
  //  let lastUpdate = Date.now();
  //  let startTime = Date.now();
    // let musicInterval = setInterval(() => {
    //   var now = Date.now();
    //   var deltaTime = now - lastUpdate;
    //   lastUpdate = now;

    //   if (musicNotes.length <= 0) {
    //     clearInterval(musicInterval);
    //     return;
    //   }
    //   musicTime += deltaTime;
    //   if (musicNotes[0].note != "rest" && musicNotes[0].timestamp <= musicTime) {
    //     let currentNote = musicNotes.shift();
    //     if (!currentNote) return;
    //     let midi = notes.find(note => currentNote && note.note === currentNote.note)?.midi;
    //     if (!midi) return;
    //     console.log('midi', midi, 'currentNote', currentNote);
    //     console.log('currentTime', now - startTime, now - startTime - currentNote.timestamp);
        

    //     this.pitcher.playSample(midi, currentNote.duration);
    //   } else if (musicNotes[0].note === 'rest') {
    //     let currentNote = musicNotes.shift();
    //   }
    // }, 0.1);
  }
}