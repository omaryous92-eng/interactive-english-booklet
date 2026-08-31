/* ============================================================
   sounds.js
   Sound effects using Web Audio API (no external files needed)
   ============================================================ */

const SoundEngine = {
    audioContext: null,
    
    init: function() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    },
    
    playCorrect: function() {
        if (!this.audioContext) this.init();
        const ctx = this.audioContext;
        
        // Play a cheerful ascending arpeggio
        const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
        notes.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.value = freq;
            gain.gain.setValueAtTime(0.15, ctx.currentTime + i * 0.1);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.1 + 0.2);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(ctx.currentTime + i * 0.1);
            osc.stop(ctx.currentTime + i * 0.1 + 0.2);
        });
    },
    
    playIncorrect: function() {
        if (!this.audioContext) this.init();
        const ctx = this.audioContext;
        
        // Play a descending dissonant sound
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(300, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.3);
    },
    
    playCelebration: function() {
        if (!this.audioContext) this.init();
        const ctx = this.audioContext;
        
        // Play a short celebratory melody
        const melody = [523.25, 523.25, 523.25, 659.25, 783.99, 659.25, 783.99];
        const durations = [0.15, 0.15, 0.15, 0.15, 0.3, 0.15, 0.3];
        let time = ctx.currentTime;
        melody.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.value = freq;
            gain.gain.setValueAtTime(0.12, time);
            gain.gain.exponentialRampToValueAtTime(0.001, time + durations[i]);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(time);
            osc.stop(time + durations[i]);
            time += durations[i] + 0.02;
        });
    }
};