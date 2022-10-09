import { Music, MusicEvent } from "../../Music/Music";

export default class SheetMusic {
  bars: MusicEvent[][] = [];
  staffsGo: any[][][] = [];
  sceneInst: Phaser.Scene;

  constructor(sceneInst: Phaser.Scene, music: Music, x: number, y: number) {
    this.sceneInst = sceneInst;
    // split into bars
    let timeSigSplit = music["time signature"].split("/");
    if (timeSigSplit.length != 2) return;
    let barLength = Number(timeSigSplit[0]) / Number(timeSigSplit[1]);
    if (Number.isNaN(barLength)) return;
    this.sortIntoBars(music.events, barLength);
    this.renderStaffs();

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

  renderStaffs = () => {
    // this.sceneInst.add.
  }

  getCurrentNote = (shift: boolean = false) => {
    if(shift){
      return this.staffsGo[0][0].shift();
    }
    return this.staffsGo[0][0][0];
  }
  getNotePos = () => {
    return this.getCurrentNote().pos; //FIXME: this is bullshit.. is it though..? Why..? xD
  }

}