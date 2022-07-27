import Canvas from './components/Canvas';
import './App.css';
import React from 'react';
import NoteBox from './Utils/NoteBox';

function App() {
  
  const [size, setSize] = React.useState({
    height: window.innerHeight,
    width: window.innerWidth
  });

  const [boxes, setBoxes] = React.useState<NoteBox[]>([]);

  React.useEffect(() => {
    function handleResize() {
      setSize({
        height: window.innerHeight,
        width: window.innerWidth
      });
      console.log("resize");
    }
    window.addEventListener('resize', handleResize);
    setBoxes([new NoteBox(Math.random() * 200)]);
  },[]);

  

  const draw = (ctx:any, frameCount: number) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.fillStyle = '#32a852'
    ctx.beginPath()

    // ctx.rect(50, 50, 25, 25);

    for (const box of boxes) {
      box.render(ctx);
    }


    // console.log("ctx.canvas.width", ctx.canvas.width);
    
    // Create gradient
    // var grd = ctx.createRadialGradient(75, 75, 5, 90, 90, 50*Math.sin(frameCount*0.05)**2+50);
    // grd.addColorStop(0, "red");
    // grd.addColorStop(1, "white");

    // // Fill with gradient
    // ctx.fillStyle = grd;
    // ctx.fillRect(10, 10, 150, 150);
    ctx.fill()
  }

  
  console.log('size', size)

  return <Canvas draw={draw} /*style={{width:'500px'}}*/ height={size.height} width={size.width} />
}

export default App;
