import { evaluate } from "mathjs";
import React, { useEffect, useRef, useState } from "react";
import OdeToJoy from '../Music/OdeToJoy.json';

const VerticalNotesCanvas = (props: any) => {
  const { ...rest } = props
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [size, setSize] = useState({
    height: global.innerHeight,
    width: global.innerWidth
  });

  const stringlanes = [
    {
      freq: '196',
    },
    {
      freq: '293.7',
    },
    {
      freq: '440',
    },
    {
      freq: '659.3',
    },
  ]

  useEffect(() => {
    function handleResize() {
      setSize({
        height: global.innerHeight,
        width: global.innerWidth
      });
    }
    window.addEventListener('resize', handleResize);
  }, []);

  let currentNote: { note: string, time: number } | undefined = undefined;
  const noteArray: { color: string, x: number, y: number, length: number }[] = [];

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animationFrameId = 0;

    let time = {
      currentTime: new Date().getTime(),
      lastTime: new Date().getTime(),
      delta: 0
    }

    const render = () => {
      animationFrameId = window.requestAnimationFrame(render);
      time.lastTime = time.currentTime;
      time.currentTime = new Date().getTime();
      time.delta = time.currentTime - time.lastTime;
      ctx.clearRect(0, 0, global.innerWidth, global.innerHeight);
      animate(ctx, time);
    }
    render()
    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const animate = (ctx: CanvasRenderingContext2D, time: any) => {
    if (currentNote == null || currentNote.time <= 0) {
      let newNote = OdeToJoy.shift();
      if (newNote) {
        currentNote = { note: newNote.note, time: evaluate(newNote.length) * 1000 * 4 }
        noteArray.push({ color: 'red', x: Math.random() * 700, y: 0, length: currentNote.time / 4 });
      }
    } else if (currentNote.time > 0) {
      currentNote.time -= time.delta;
    }
    for (const note of noteArray) {
      let traversalTime = 3;
      note.y += (window.innerHeight / (1000 / time.delta)) / traversalTime;
      ctx.fillStyle = note.color;
      ctx.fillRect(note.x, note.y, 25, note.length);
    }
    ctx.fill();
    console.log('currentNote', currentNote);
  }



  return <canvas ref={canvasRef} {...rest} height={size.height} width={size.width} />;
}

export default VerticalNotesCanvas;