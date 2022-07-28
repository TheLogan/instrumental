import React, { useEffect, useRef } from "react";

const BallsCanvas = (props: any) => {
  const { ...rest } = props
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [size, setSize] = React.useState({
    height: global.innerHeight,
    width: global.innerWidth
  });

  let mousePos: { x?: number, y?: number } = { x: undefined, y: undefined };
  const maxRadius = 100;

  const colorArray = [
    '#638475',
    '#90E39A',
    '#DDF093',
    '#F6D0B1',
    '#CE4760'
  ]
  class Circle {
    x;
    y;
    dx;
    dy;
    radius;
    startRadius;
    colorId;

    constructor() {
      this.startRadius = (Math.random() * 10) + 5;
      this.radius = this.startRadius;
      this.x = (Math.random() * (window.innerWidth - (this.radius * 2))) + this.radius;
      this.y = (Math.random() * (window.innerHeight - (this.radius * 2))) + this.radius;
      this.dx = (Math.random() - 0.5) * 5;
      this.dy = (Math.random() - 0.5) * 5;
      this.colorId = Math.floor(Math.random() * colorArray.length);
    }

    draw = (ctx: CanvasRenderingContext2D) => {
      this.update();
      ctx.beginPath();
      if (Number(mousePos.x) - this.x < 50
        && Number(mousePos.x) - this.x > -50
        && Number(mousePos.y) - this.y < 50
        && Number(mousePos.y) - this.y > -50
      ) {
        this.radius += 5;
        if (this.radius > maxRadius) this.radius = maxRadius;
      } else {
        this.radius -= 5;
        if (this.radius < this.startRadius) this.radius = this.startRadius;
      }
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      ctx.strokeStyle = colorArray[this.colorId];
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.fillStyle = colorArray[this.colorId];
      ctx.fill();
    }

    update = () => {
      this.x += this.dx;
      this.y += this.dy;

      if (this.x + this.radius > window.innerWidth || this.x - this.radius < 0) this.dx = -this.dx;
      if (this.y + this.radius > window.innerHeight || this.y - this.radius < 0) this.dy = -this.dy;
    }
  }

  const circles: Circle[] = [];
  for (let index = 0; index < 1000; index++) {
    circles.push(new Circle());
  }

  const draw = (ctx: CanvasRenderingContext2D, frameCount: number) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    for (const circle of circles) {
      circle.draw(ctx);
    }
  }

  useEffect(() => {
    function handleResize() {
      setSize({
        height: global.innerHeight,
        width: global.innerWidth
      });
    }
    // @ts-ignore
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', (e) => { mousePos = { x: e.x, y: e.y } });
  }, [])

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current
    const context = canvas.getContext('2d');
    if (!context) return;
    let frameCount = 0
    let animationFrameId = 0;

    const render = () => {
      frameCount++
      draw(context, frameCount)
      animationFrameId = window.requestAnimationFrame(render)
    }
    render()

    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [])




  return <canvas ref={canvasRef} {...rest} height={size.height} width={size.width} />
}

export default BallsCanvas;
