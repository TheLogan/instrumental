import { Music, MusicEvent } from "../../Music/Music";

export default class SheetMusic {
  bars: MusicEvent[][] = [];
  staffsGo: any[][][] = [];
  sceneInst: any;

  constructor(sceneInst: any, music: Music, x: number, y: number) {
    this.sceneInst = sceneInst;
    // split into bars
    let timeSigSplit = music["time signature"].split("/");
    if (timeSigSplit.length != 2) return;
    let barLength = Number(timeSigSplit[0]) / Number(timeSigSplit[1]);
    if (Number.isNaN(barLength)) return;
    this.sortIntoBars(music.events, barLength);

  }

  sortIntoBars = (notes: any[], barLength: number) => {
    const notesCopy = [...notes];
    let durationVal = 0;
    while (notesCopy.length > 0) {
      const currentNote = notesCopy.shift();
      if (durationVal >= barLength) {
        durationVal = 0;
        this.bars.push([]);
      }
      this.bars[this.bars.length - 1].push(currentNote);
      durationVal += currentNote.duration;
    }
  }

  getNotePos = () => {
    return this.staffsGo[0][0][0].pos; //FIXME: this is bullshit
  }

}