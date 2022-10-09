import { Music, MusicEvent } from "../../Music/Music";
import { noteLength } from "../../Utilities/Constants";

export default class SheetMusic {
  bars: MusicEvent[][] = [[]];
  staffsGo: any[][][] = [];
  sceneInst: Phaser.Scene;
  parentGo: Phaser.GameObjects.Container;
  barStartX: number;
  barStartY: number;

  constructor(sceneInst: Phaser.Scene, music: Music, x: number, y: number) {
    this.sceneInst = sceneInst;
    this.parentGo = sceneInst.add.container(0,0);
    this.barStartX = x;
    this.barStartY = y;
    // split into bars
    let timeSigSplit = music["time signature"].split("/");
    if (timeSigSplit.length != 2) return;
    let barLength = Number(timeSigSplit[0]) / Number(timeSigSplit[1]);
    if (Number.isNaN(barLength) || typeof(barLength) != "number") return;
    this.sortIntoBars(music.events, barLength);
    this.renderStaffs(0);

  }

  sortIntoBars = (notes: any[], barLength: number) => {
    const notesCopy = [...notes];
    let durationVal = 0;
    while (notesCopy.length > 0) {
      const currentNote = notesCopy.shift();
      // FIXME: If the notes don't fit neatly, they need to be split with ties.
      if (durationVal >= barLength) {
        durationVal = 0;
        this.bars.push([]);
      }
      this.bars[this.bars.length - 1].push(currentNote);
      durationVal += noteLength[currentNote.duration];
    }
  }

  renderStaffs = (index: number, ) => {
    const barContainer = this.sceneInst.add.container()
    const y = this.barStartY + 100 * index;
    // const line = this.sceneInst.add.line(this.barStartX, y, this.barStartX + 200, y);
    
    // line.strokeColor = 0xfff;
    this.sceneInst.add.rectangle(this.barStartX, this.barStartY, 100, 100, 0xfff)
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