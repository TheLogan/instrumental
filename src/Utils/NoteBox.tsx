export default class NoteBox {
  xPos: number
  constructor(xPos: number) {
    this.xPos = xPos;
  }

  render(ctx:any){
    ctx.rect(this.xPos, 50, 25, 25);
  }
}