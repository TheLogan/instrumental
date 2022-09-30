import { images } from "../../Utilities/assets";
import LearnSheetMusic from "./LearnSheetMusic";

export const renderMeta = (that: LearnSheetMusic, topBarY: number) => {
  let graphics = that.add.graphics();
  graphics.fillGradientStyle(0xfff6de, 0xffeebf, 0xffeebf, 0xffde82);
  graphics.fillRect(0, 0, that.renderer.width, that.renderer.height);


  // draws the horizontal bars
  const fBar = that.add.rectangle(that.renderer.width / 2, topBarY, that.renderer.width - 100, 2, 0x000000);
  fBar.fillColor = 0xff0000;
  const dBar = that.add.rectangle(that.renderer.width / 2, topBarY + 16, that.renderer.width - 100, 2, 0x000000);
  const bBar = that.add.rectangle(that.renderer.width / 2, topBarY + 32, that.renderer.width - 100, 2, 0x000000);
  const gBar = that.add.rectangle(that.renderer.width / 2, topBarY + 48, that.renderer.width - 100, 2, 0x000000);
  const eBar = that.add.rectangle(that.renderer.width / 2, topBarY + 64, that.renderer.width - 100, 2, 0x000000);
  let clef = that.add.image(100, topBarY + 30, images.TREBLECLEF);
  clef.scale = 0.4;

  that.add.rectangle(fBar.getRightCenter().x - 20, fBar.y + 32, 3, 65, 0x000000);
  that.add.rectangle(fBar.getRightCenter().x, fBar.y + 32, 10, 65, 0x000000);
}

export const addNote = (centerNote: string) => {

}