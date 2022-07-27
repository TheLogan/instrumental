// import DrawingCanvas from './components/DrawingCanvas';
// import BallsCanvas from './components/BallsCanvas';
import './App.css';
import React, { useState } from 'react';
import NoteBox from './Utils/NoteBox';
import SinewaveCanvas from './components/SinewaveCanvas';

function App() {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [boxes, setBoxes] = useState<NoteBox[]>([]);


  React.useEffect(() => {

    setBoxes([new NoteBox(Math.random() * 200)]);
  }, []);

  return <SinewaveCanvas />
}

export default App;
