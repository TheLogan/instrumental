import Phaser from 'phaser';
import TunerEngine from '../Utilities/TunerEngine';
import { notes } from '../Utilities/Constants';

export default class TunerScene extends Phaser.Scene {
    constructor() {
        super('TunerScene');
    }
    textRender?: Phaser.GameObjects.Text;
    tunerEngine?: TunerEngine;

    create() {
        console.log('init');
        //this.initialize();
        this.textRender = this.add.text(this.renderer.width / 2, this.renderer.height / 2, '', { fontSize: '64px' });
        this.tunerEngine = new TunerEngine();
    }


    update() {
        //console.log('update');
        const freq = this.tunerEngine?.getFreq();
        let noteIndex = notes.findIndex(x => freq && x.freq > freq);
        console.log('freq', notes[noteIndex].note, freq);
        
        if (noteIndex != -1 && this.textRender)
            this.textRender.text = String(notes[noteIndex].note);
    }

}

