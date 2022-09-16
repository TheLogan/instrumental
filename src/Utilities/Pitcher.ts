export default class Pitcher {
    audioContext: AudioContext;
    //analyser: AnalyserNode;

    constructor() {
        this.audioContext = new window.AudioContext();
        //this.analyser = this.audioContext.createAnalyser();
        this.initialize()
    }

    async initialize() {
        var source;
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

    playPitch = (freq: number, overToneCount: number, duration: number) => {
        const ovtBank = [];
        for (let index = 1; index < overToneCount + 1; index++) {
            const gainNode = this.audioContext.createGain();
            gainNode.connect(this.audioContext.destination);
            gainNode.gain.setTargetAtTime(0, this.audioContext.currentTime + duration - 0.075, 0.015);
            const osc = this.createOscillators(freq + (10 * index - 1))
            ovtBank.push(osc);
            osc.connect(gainNode);
            osc.start();
            osc.stop(this.audioContext.currentTime + duration);

        }


    }

    createOscillators = (freq: number) => {
        const osc = this.audioContext.createOscillator();
        osc.frequency.value = freq;
        return osc;
    }
}