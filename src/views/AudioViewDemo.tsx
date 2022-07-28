import React, { useEffect, useRef, useState } from 'react';
import Meyda from 'meyda';



let increment = 0;

const AudioViewDemo = () => {

  const [analyser, setAnalyser] = useState<Meyda.MeydaAnalyzer | null>(null);
  const [running, setRunning] = useState(false);
  const [features, setFeatures] = useState<{ amplitudeSpectrum: number[], powerSpectrum: number[] } | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [size, setSize] = useState({
    height: global.innerHeight,
    width: global.innerWidth
  });
  useEffect(() => {
    function handleResize() {
      setSize({
        height: global.innerHeight,
        width: global.innerWidth
      });
    }
    window.addEventListener('resize', handleResize);
  }, [])

  useEffect(() => { initialize(); }, [])
  const audioContext = new AudioContext();

  const initialize = async () => {
    let stream = await getMedia();
    if (!stream || audioContext.state === 'closed') return;
    setRunning(true);
    const source = audioContext.createMediaStreamSource(stream);
    let newAnalyser = Meyda.createMeydaAnalyzer({
      audioContext,
      source,
      bufferSize: 1024,
      featureExtractors: ['amplitudeSpectrum', 'mfcc', 'rms', 'chroma', 'powerSpectrum'],
      callback: (features: any) => {
        setFeatures(features);
      }
    })

    setAnalyser(newAnalyser);

    return () => {
      if (newAnalyser) {
        newAnalyser.stop()
      }
      if (audioContext) {
        audioContext.close()
      }
    }
  }

  useEffect(() => {
    if (analyser) {
      if (running) {
        analyser.start()
      } else {
        console.log("stop everything");
        analyser.stop()
      }
    }
  }, [running, analyser])

  // let chroma = "meh";
  if (features && running) {
    // console.log(features.amplitudeSpectrum)
    // const arr = ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B']
    // const largest = Math.max(...features.chroma)
    // chroma = arr[features.chroma.findIndex((x: number) => x === largest)] + ' : ' + largest;
  }


  const drawLine = () => {
    const canvas = canvasRef.current;
    if (!canvas || !features) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    // ctx.clearRect(0, 0, global.innerWidth, global.innerHeight);
    // ctx.filter = 'blur(2px)';
    ctx.fillStyle = 'rgba(256,256,256,0.05)';
    ctx.filter = '';
    ctx.fillRect(0, 0, global.innerWidth, global.innerHeight);

    ctx.beginPath();
    ctx.moveTo(-4, ctx.canvas.height / 2);
    let amps = features.powerSpectrum.slice(0, features.powerSpectrum.length / 2);
    increment += 0.001;
    // ctx.strokeStyle = `hsl(${360 * Math.abs(Math.sin(increment))}, 50%, 50%)`;
    for (let index = 0; index < amps.length; index++) {
      ctx.lineTo(index * 3, (ctx.canvas.height / 2) + amps[index]);
    }
    ctx.stroke();
  }
  drawLine();


  return <div>
    <canvas ref={canvasRef} height={size.height} width={size.width} />
    {/* <button onClick={() => { setRunning(!running); }}>stahp!</button>
    <div>Volume: {Number(features?.rms).toFixed(4)}</div>
    <div>frequency: {chroma}</div> */}
  </div>

}
export default AudioViewDemo;


const getMedia = async () => {
  try {
    return await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    })
  } catch (err) {
    console.error('Error:', err)
  }
}