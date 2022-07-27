import React, { useRef, useEffect } from 'react'

const DrawingCanvas = (props: any) => {

  const { ...rest } = props
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  // useEffect(() => {
  //   if (!canvasRef.current) return;

  //   const canvas = canvasRef.current
  //   const context = canvas.getContext('2d');
  //   if (!context) return;
  //   let frameCount = 0
  //   let animationFrameId = 0;
  //   const render = () => {
  //     frameCount++
  //     draw(context, frameCount)
  //     animationFrameId = window.requestAnimationFrame(render)
  //   }
  //   render()
  //   return () => {
  //     window.cancelAnimationFrame(animationFrameId)
  //   }
  // }, [draw])


  let painting = false;

  function startPosition(e: MouseEvent) {
    painting = true;
    draw(e);
  }

  function endPosition() {
    painting = false;
    if (!canvasRef.current) return;
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.beginPath();
  }
  // EventListeners



  const draw = (e: MouseEvent) => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d');
    if (!ctx) return;


    if (!painting) return;
    ctx.lineWidth = 10;
    ctx.lineCap = 'round';

    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY);
  }
  useEffect(() => {
    document.addEventListener('mousedown', startPosition);
    document.addEventListener('mouseup', endPosition);
    document.addEventListener('mousemove', draw)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return <canvas ref={canvasRef} {...rest} />
}

export default DrawingCanvas