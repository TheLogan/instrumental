import Phaser from 'phaser';
import TunerEngine from '../Utilities/TunerEngine';
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
        console.log('freq',freq);
        
        if(this.textRender)
            this.textRender.text = String(freq);
    }

}

