import Phaser from 'phaser'
import Meyda from 'meyda';
import { MeydaAnalyzer } from 'meyda/dist/esm/meyda-wa';

// Read about Meyda here: 
// https://meyda.js.org/audio-features.html

export default class AnalyseAudio extends Phaser.Scene {
  constructor() { super('AnalyseAudio') }
  analyser?: MeydaAnalyzer;
  audioContext?: AudioContext;
  graphics?: Phaser.GameObjects.Graphics;
  features?: any;
  textRender?: Phaser.GameObjects.Text;

  state: 'updated' | 'rendered' = 'rendered';

  create = async () => {
    this.graphics = this.add.graphics();
    this.audioContext = new AudioContext();
    let stream = await getMedia();
    if (!stream || this.audioContext.state === 'closed') return;
    // setRunning(true);

    const source = this.audioContext.createMediaStreamSource(stream);
    let newAnalyser = Meyda.createMeydaAnalyzer({
      audioContext: this.audioContext,
      source,
      bufferSize: 1024,
      featureExtractors: ['amplitudeSpectrum', 'mfcc', 'rms', 'chroma', 'powerSpectrum'],
      callback: (features: any) => {
        this.features = features;
        this.state = 'updated';
      }
    })
    this.analyser = newAnalyser;

    newAnalyser.start();

    this.scene.scene.events.on('shutdown', () => {
      this.cleanup();
    })

    setTimeout(() => {
      console.log(this.features)
    }, 3000);

    this.textRender = this.add.text(this.renderer.width / 2, this.renderer.height / 2, '', { fontSize: '64px' });
  }

  chromaArray = [
    "C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B"
  ]

  update() {
    if (this.features && this.graphics && this.state === 'updated') {
      this.graphics.clear();
      this.graphics.beginPath();
      this.graphics.lineStyle(3, 0x000000);
      this.graphics.moveTo(0, this.renderer.height / 2);
      // let amps = this.features.powerSpectrum.slice(0, this.features.powerSpectrum.length / 2);
      let amps = this.features.powerSpectrum;
      let distance = this.renderer.width / amps.length;
      for (let i = 0; i < amps.length; i++) {
        this.graphics.lineTo(i * distance, (this.renderer.height / 2) + amps[i] * 5);
      }
      this.graphics.stroke();
      this.state = 'rendered';
    }

    if (this.features && this.textRender) {
      const chroma: number[] = this.features.chroma;
      const largest = Math.max(...chroma);
      const index = chroma.findIndex(x => x === largest);

      this.textRender.text = this.chromaArray[index];
    }
  }




  cleanup = () => {
    if (this.analyser) this.analyser.stop();
    if (this.audioContext) this.audioContext.close();
  }





  // initialize = async () => {
  //   return () => {
  //     if (newAnalyser) {
  //       newAnalyser.stop()
  //     }
  //     if (audioContext) {
  //       audioContext.close()
  //     }
  //   }
  // }
}

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