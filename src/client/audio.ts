/**
 * Generative Audio System
 * Creates ambient background music and interaction sounds using Web Audio API
 */

export class AudioSystem {
    private audioContext: AudioContext | null = null;
    private masterGain: GainNode | null = null;
    private ambientGain: GainNode | null = null;
    private sfxGain: GainNode | null = null;
    private isInitialized = false;
    private isPlaying = false;

    // Ambient music state
    private ambientOscillators: OscillatorNode[] = [];
    private ambientInterval: number | null = null;
    private currentScale = [0, 2, 4, 7, 9]; // Pentatonic scale (C major)
    private baseFreq = 220; // A3

    // Volume settings
    private masterVolume = 0.3;
    private ambientVolume = 0.15;
    private sfxVolume = 0.4;

    constructor() {
        // Initialize on first user interaction
        this.setupUserInteractionListener();
    }

    private setupUserInteractionListener() {
        const initAudio = () => {
            if (!this.isInitialized) {
                this.initialize();
                document.removeEventListener('click', initAudio);
                document.removeEventListener('keydown', initAudio);
                document.removeEventListener('touchstart', initAudio);
            }
        };

        document.addEventListener('click', initAudio);
        document.addEventListener('keydown', initAudio);
        document.addEventListener('touchstart', initAudio);
    }

    private async initialize() {
        try {
            this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

            // Create master gain node
            this.masterGain = this.audioContext.createGain();
            this.masterGain.gain.value = this.masterVolume;
            this.masterGain.connect(this.audioContext.destination);

            // Create separate gain nodes for ambient and SFX
            this.ambientGain = this.audioContext.createGain();
            this.ambientGain.gain.value = this.ambientVolume;
            this.ambientGain.connect(this.masterGain);

            this.sfxGain = this.audioContext.createGain();
            this.sfxGain.gain.value = this.sfxVolume;
            this.sfxGain.connect(this.masterGain);

            this.isInitialized = true;
            console.log('Audio system initialized');
        } catch (error) {
            console.warn('Failed to initialize audio:', error);
        }
    }

    // Start ambient background music
    startAmbient() {
        if (!this.isInitialized || this.isPlaying) return;

        this.isPlaying = true;
        this.generateAmbientLayer();

        // Create evolving ambient soundscape
        this.ambientInterval = window.setInterval(() => {
            this.evolveAmbient();
        }, 8000 + Math.random() * 4000); // 8-12 seconds between changes
    }

    // Stop ambient music
    stopAmbient() {
        if (!this.isPlaying) return;

        this.isPlaying = false;

        if (this.ambientInterval) {
            clearInterval(this.ambientInterval);
            this.ambientInterval = null;
        }

        // Fade out existing oscillators
        this.ambientOscillators.forEach(osc => {
            const gain = osc.context.createGain();
            gain.gain.setValueAtTime(0.1, osc.context.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, osc.context.currentTime + 2);

            osc.disconnect();
            osc.connect(gain);
            gain.connect(this.ambientGain!);

            setTimeout(() => {
                try {
                    osc.stop();
                } catch (e) {
                    // Oscillator might already be stopped
                }
            }, 2000);
        });

        this.ambientOscillators = [];
    }

    private generateAmbientLayer() {
        if (!this.audioContext || !this.ambientGain) return;

        // Create 2-4 oscillators for harmonic layers
        const numOscillators = 2 + Math.floor(Math.random() * 3);

        for (let i = 0; i < numOscillators; i++) {
            const osc = this.audioContext.createOscillator();
            const gain = this.audioContext.createGain();
            const filter = this.audioContext.createBiquadFilter();

            // Choose frequency from pentatonic scale
            const scaleIndex = Math.floor(Math.random() * this.currentScale.length);
            const octave = 3 + Math.floor(Math.random() * 3); // Octaves 3-5
            const scaleNote = this.currentScale[scaleIndex];
            if (scaleNote === undefined) return; // Safety check
            const frequency = this.baseFreq * Math.pow(2, (scaleNote + (octave - 3) * 12) / 12);

            // Oscillator settings
            const waveTypes: OscillatorType[] = ['sine', 'triangle', 'sawtooth'];
            const selectedType = waveTypes[Math.floor(Math.random() * 3)];
            osc.type = selectedType || 'sine';
            osc.frequency.setValueAtTime(frequency, this.audioContext.currentTime);

            // Add subtle frequency modulation
            const lfo = this.audioContext.createOscillator();
            const lfoGain = this.audioContext.createGain();
            lfo.frequency.value = 0.1 + Math.random() * 0.3; // Very slow LFO
            lfoGain.gain.value = frequency * 0.002; // Subtle modulation
            lfo.connect(lfoGain);
            lfoGain.connect(osc.frequency);
            lfo.start();

            // Filter for warmth
            filter.type = 'lowpass';
            filter.frequency.value = 800 + Math.random() * 1200;
            filter.Q.value = 0.5 + Math.random() * 1;

            // Gain envelope
            gain.gain.setValueAtTime(0, this.audioContext.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.02 + Math.random() * 0.03, this.audioContext.currentTime + 2 + Math.random() * 3);

            // Connect the chain
            osc.connect(filter);
            filter.connect(gain);
            gain.connect(this.ambientGain);

            osc.start();
            this.ambientOscillators.push(osc);

            // Schedule stop for this layer
            const duration = 15000 + Math.random() * 20000; // 15-35 seconds
            setTimeout(() => {
                if (this.ambientOscillators.includes(osc) && this.audioContext) {
                    gain.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 3);
                    setTimeout(() => {
                        try {
                            osc.stop();
                            lfo.stop();
                        } catch (e) {
                            // Already stopped
                        }
                        const index = this.ambientOscillators.indexOf(osc);
                        if (index > -1) {
                            this.ambientOscillators.splice(index, 1);
                        }
                    }, 3000);
                }
            }, duration);
        }
    }

    private evolveAmbient() {
        if (!this.isPlaying) return;

        // Occasionally change the scale for variety
        if (Math.random() < 0.3) {
            const scales: number[][] = [
                [0, 2, 4, 7, 9],     // Major pentatonic
                [0, 3, 5, 7, 10],    // Minor pentatonic
                [0, 2, 3, 7, 8],     // Japanese scale
                [0, 1, 5, 7, 8]      // Hirajoshi scale
            ];
            const selectedScale = scales[Math.floor(Math.random() * scales.length)];
            if (selectedScale) {
                this.currentScale = selectedScale;
            }
        }

        // Add new ambient layer
        this.generateAmbientLayer();
    }

    // Sound effects
    playButtonHover() {
        this.playTone(440, 0.1, 0.05, 'sine');
    }

    playButtonClick() {
        this.playTone(660, 0.15, 0.1, 'triangle');
    }

    playWorldSelect() {
        // Ascending chord
        const frequencies = [330, 415, 523]; // E4, G#4, C5
        frequencies.forEach((freq, i) => {
            setTimeout(() => {
                this.playTone(freq, 0.2, 0.08, 'sine');
            }, i * 50);
        });
    }

    playGameStart() {
        // Rising sweep
        if (!this.audioContext || !this.sfxGain) return;

        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, this.audioContext.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, this.audioContext.currentTime + 0.8);

        gain.gain.setValueAtTime(0, this.audioContext.currentTime);
        gain.gain.linearRampToValueAtTime(0.1, this.audioContext.currentTime + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.8);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start();
        osc.stop(this.audioContext.currentTime + 0.8);
    }

    playGameExit() {
        // Descending sweep
        if (!this.audioContext || !this.sfxGain) return;

        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(660, this.audioContext.currentTime);
        osc.frequency.exponentialRampToValueAtTime(220, this.audioContext.currentTime + 0.6);

        gain.gain.setValueAtTime(0, this.audioContext.currentTime);
        gain.gain.linearRampToValueAtTime(0.08, this.audioContext.currentTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.6);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start();
        osc.stop(this.audioContext.currentTime + 0.6);
    }

    playError() {
        // Dissonant chord
        const frequencies: number[] = [200, 267, 356]; // Dissonant intervals
        frequencies.forEach((freq, i) => {
            setTimeout(() => {
                this.playTone(freq, 0.3, 0.06, 'square');
            }, i * 30);
        });
    }

    private playTone(frequency: number, duration: number, volume: number, type: OscillatorType = 'sine') {
        if (!this.audioContext || !this.sfxGain) return;

        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();

        osc.type = type;
        osc.frequency.value = frequency;

        gain.gain.setValueAtTime(0, this.audioContext.currentTime);
        gain.gain.linearRampToValueAtTime(volume, this.audioContext.currentTime + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start();
        osc.stop(this.audioContext.currentTime + duration);
    }

    // Volume controls
    setMasterVolume(volume: number) {
        this.masterVolume = Math.max(0, Math.min(1, volume));
        if (this.masterGain) {
            this.masterGain.gain.value = this.masterVolume;
        }
    }

    setAmbientVolume(volume: number) {
        this.ambientVolume = Math.max(0, Math.min(1, volume));
        if (this.ambientGain) {
            this.ambientGain.gain.value = this.ambientVolume;
        }
    }

    setSfxVolume(volume: number) {
        this.sfxVolume = Math.max(0, Math.min(1, volume));
        if (this.sfxGain) {
            this.sfxGain.gain.value = this.sfxVolume;
        }
    }

    // Cleanup
    destroy() {
        this.stopAmbient();
        if (this.audioContext) {
            this.audioContext.close();
        }
    }
}

// Create and export audio system instance
export const audioSystem = new AudioSystem();