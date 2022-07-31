import Phaser from 'phaser'
import Meyda from 'meyda';
import { MeydaAnalyzer } from 'meyda/dist/esm/meyda-wa';

export default class AnalyseAudio extends Phaser.Scene {
  constructor() { super('AnalyseAudio') }
  analyser?: MeydaAnalyzer;

  create = async () => {
    const audioContext = new AudioContext();
    let stream = await getMedia();
    if (!stream || audioContext.state === 'closed') return;
    // setRunning(true);

    const source = audioContext.createMediaStreamSource(stream);
    let newAnalyser = Meyda.createMeydaAnalyzer({
      audioContext,
      source,
      bufferSize: 1024,
      featureExtractors: ['amplitudeSpectrum', 'mfcc', 'rms', 'chroma', 'powerSpectrum'],
      callback: (features: any) => {
        this.audioCallback(features);
      }
    })
    this.analyser = newAnalyser;
  }

  audioCallback(features: any) {

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