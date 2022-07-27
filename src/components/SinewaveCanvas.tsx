import React, { useEffect, useRef, useState } from "react";


const SinewaveCanvas = (props: any) => {
  const { ...rest } = props
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [size, setSize] = useState({
    height: global.innerHeight,
    width: global.innerWidth
  });

  const [amplitude, setAmplitude] = useState(100);

  useEffect(() => {
    function handleResize() {
      setSize({
        height: global.innerHeight,
        width: global.innerWidth
      });
    }
    // @ts-ignore
    window.addEventListener('resize', handleResize);
  }, [])


  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let frameCount = 0
    let animationFrameId = 0;


    let increment = 0.01;
    const render = () => {
      frameCount++
      animationFrameId = window.requestAnimationFrame(render)

      ctx.filter = 'blur(1px)';
      ctx.fillStyle = 'rgba(0,0,0,0.01)';
      ctx.filter = '';
      ctx.fillRect(0, 0, global.innerWidth, global.innerHeight)

      ctx.beginPath();
      ctx.moveTo(0, ctx.canvas.height / 2);
      let wavelength = 0.01;

      for (let i = 0; i < ctx.canvas.width; i++) {
        ctx.lineTo(i, ctx.canvas.height / 2 + Math.sin(i * wavelength + increment) * amplitude * Math.sin(increment * 2));
      }
      ctx.strokeStyle = `hsl(${200 * Math.abs(Math.sin(increment))}, 50%, 50%)`;
      ctx.stroke();
      increment += 0.01;

    }
    render()

    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [amplitude])


  return <div>
    <input type="text" value={amplitude} onChange={e => setAmplitude(Number(e.target.value))} />
    <canvas ref={canvasRef} {...rest} height={size.height} width={size.width} />
  </div>
}

export default SinewaveCanvas;