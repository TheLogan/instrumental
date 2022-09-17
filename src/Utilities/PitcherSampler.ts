export default class PitcherSampler {
    audioContext: AudioContext;
    sample?: AudioBuffer

    constructor() {
        this.audioContext = new window.AudioContext();
        //this.analyser = this.audioContext.createAnalyser();
        this.initialize()
    }

    async initialize() {
        var source;

        try {
            let resp = await fetch('assets/Samples/ac-gtr-str3.wav');
            this.sample = await this.audioContext.decodeAudioData(await resp.arrayBuffer());
        } catch (error) {
            throw error;
        }

        if (!navigator?.mediaDevices?.getUserMedia) {
            // No audio allowed
            alert('Sorry, getUserMedia is required for the app.')
            return;
        } else {
            var constraints = { audio: true };
            try {
                const stream = await navigator.mediaDevices.getUserMedia(constraints);
                // Initialize the SourceNode
                source = this.audioContext.createMediaStreamSource(stream);
                // Connect the source node to the analyzer
                // source.connect(this.analyser);
            } catch (error) {
                alert('Sorry, microphone permissions are required for the app. Feel free to read on without playing :)')
            }
        }
    }

    makeDistortionCurve(amount: number) {
        const k = amount;
        const n_samples = 44100;
        const curve = new Float32Array(n_samples);
        // const deg = Math.PI / 180;
        let i = 0;
        let x;
        for (; i < n_samples; ++i) {
            x = i * 2 / n_samples - 1;
            curve[i] = (3 + k) * Math.atan(Math.sinh(x * 0.25) * 5) / (Math.PI + k * Math.abs(x));
        }
        return curve;
    }


    playSample(noteToPlay: number, duration: number) {
        if (!this.sample) return;
        const gainNode = this.audioContext.createGain();
        const distNode = this.audioContext.createWaveShaper();
        distNode.curve = this.makeDistortionCurve(400);
        const source = this.audioContext.createBufferSource();
        source.buffer = this.sample;
        source.playbackRate.value = 2 ** ((noteToPlay - 55) / 12);
        source.connect(distNode);
        distNode.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        gainNode.gain.setTargetAtTime(0, this.audioContext.currentTime + duration - 0.2, 0.3);
        source.start(0);
        //source.stop(this.audioContext.currentTime + duration);
    }
    //   playSample(sample, 60, 62);
}