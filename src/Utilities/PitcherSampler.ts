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
    playSample(noteToPlay:number) {
        if(!this.sample) return;

        const source = this.audioContext.createBufferSource();
        source.buffer = this.sample;
        source.playbackRate.value = 2 ** ((noteToPlay - 55) / 12);
        source.connect(this.audioContext.destination);
        source.start(0);
      }
    //   playSample(sample, 60, 62);
}