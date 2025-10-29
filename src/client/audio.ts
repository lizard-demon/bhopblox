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

    // Windchime state
    private windchimeOscillators: OscillatorNode[] = [];
    private windchimeInterval: number | null = null;
    private windchimeScale = [0, 2, 4, 7, 9, 12, 14, 16]; // Extended pentatonic with octaves
    private baseFreq = 523.25; // C5 - higher register for bell-like quality

    // Volume settings
    private masterVolume = 0.3;
    private ambientVolume = 0.25; // Slightly higher for windchimes to be audible
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

    // Start windchime ambient music
    startAmbient() {
        if (!this.isInitialized || this.isPlaying) return;

        this.isPlaying = true;
        this.startWindchimes();
    }

    // Stop windchime music
    stopAmbient() {
        if (!this.isPlaying) return;

        this.isPlaying = false;

        if (this.windchimeInterval) {
            clearInterval(this.windchimeInterval);
            this.windchimeInterval = null;
        }

        // Let existing chimes naturally decay
        this.windchimeOscillators = [];
    }

    private startWindchimes() {
        if (!this.audioContext || !this.ambientGain) return;

        // Schedule random windchime strikes
        const scheduleNextChime = () => {
            if (!this.isPlaying) return;

            // Random delay between chimes (2-8 seconds)
            const delay = 2000 + Math.random() * 6000;

            this.windchimeInterval = window.setTimeout(() => {
                this.playWindchime();
                scheduleNextChime();
            }, delay);
        };

        scheduleNextChime();
    }

    private playWindchime() {
        if (!this.audioContext || !this.ambientGain) return;

        // Choose a random note from the windchime scale
        const scaleIndex = Math.floor(Math.random() * this.windchimeScale.length);
        const scaleNote = this.windchimeScale[scaleIndex];
        if (scaleNote === undefined) return;

        // Calculate frequency (C5 base with scale notes)
        const frequency = this.baseFreq * Math.pow(2, scaleNote / 12);

        // Create bell-like sound with multiple harmonics
        this.createBellTone(frequency);

        // Sometimes play a gentle chord (20% chance)
        if (Math.random() < 0.2) {
            setTimeout(() => {
                const harmonicNote = this.windchimeScale[Math.floor(Math.random() * this.windchimeScale.length)];
                if (harmonicNote !== undefined) {
                    const harmonicFreq = this.baseFreq * Math.pow(2, harmonicNote / 12);
                    this.createBellTone(harmonicFreq, 0.6); // Softer volume for harmony
                }
            }, 100 + Math.random() * 300);
        }
    }

    private createBellTone(frequency: number, volumeMultiplier: number = 1) {
        if (!this.audioContext || !this.ambientGain) return;

        // Create multiple oscillators for bell-like harmonics
        const harmonics = [1, 2.76, 5.4, 8.93]; // Bell-like harmonic ratios
        const volumes = [0.8, 0.3, 0.15, 0.08]; // Decreasing volumes for harmonics

        harmonics.forEach((harmonic, index) => {
            const osc = this.audioContext!.createOscillator();
            const gain = this.audioContext!.createGain();
            const filter = this.audioContext!.createBiquadFilter();

            // Set frequency with harmonic
            osc.frequency.value = frequency * harmonic;
            osc.type = 'sine'; // Pure sine waves for clean bell tones

            // High-pass filter to add brightness
            filter.type = 'highpass';
            filter.frequency.value = 200;
            filter.Q.value = 0.5;

            // Bell-like envelope: quick attack, long decay
            const volume = (volumes[index] || 0.05) * 0.04 * volumeMultiplier;
            gain.gain.setValueAtTime(0, this.audioContext!.currentTime);
            gain.gain.linearRampToValueAtTime(volume, this.audioContext!.currentTime + 0.01); // Very quick attack
            gain.gain.exponentialRampToValueAtTime(volume * 0.3, this.audioContext!.currentTime + 0.5); // Initial decay
            gain.gain.exponentialRampToValueAtTime(0.001, this.audioContext!.currentTime + 4 + Math.random() * 3); // Long natural decay

            // Connect the audio chain
            osc.connect(filter);
            filter.connect(gain);
            gain.connect(this.ambientGain!);

            // Start and schedule stop
            osc.start();
            const stopTime = this.audioContext!.currentTime + 7;
            osc.stop(stopTime);

            this.windchimeOscillators.push(osc);

            // Clean up reference after it stops
            setTimeout(() => {
                const index = this.windchimeOscillators.indexOf(osc);
                if (index > -1) {
                    this.windchimeOscillators.splice(index, 1);
                }
            }, 7000);
        });
    }

    // Sound effects
    playButtonHover() {
        // Soft windchime-like tone
        this.playBellTone(523.25, 0.8, 0.03); // C5
    }

    playButtonClick() {
        // Gentle chime
        this.playBellTone(659.25, 1.2, 0.05); // E5
    }

    playWorldSelect() {
        // Gentle ascending windchime sequence
        const frequencies = [523.25, 659.25, 783.99]; // C5, E5, G5 - major triad
        frequencies.forEach((freq, i) => {
            setTimeout(() => {
                this.playBellTone(freq, 1.5, 0.06);
            }, i * 150);
        });
    }

    playGameStart() {
        // Gentle ascending windchime cascade
        const frequencies = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
        frequencies.forEach((freq, i) => {
            setTimeout(() => {
                this.playBellTone(freq, 2.0, 0.08);
            }, i * 200);
        });
    }

    playGameExit() {
        // Gentle descending windchime cascade
        const frequencies = [1046.5, 783.99, 659.25, 523.25]; // C6, G5, E5, C5
        frequencies.forEach((freq, i) => {
            setTimeout(() => {
                this.playBellTone(freq, 1.8, 0.06);
            }, i * 150);
        });
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

    private playBellTone(frequency: number, duration: number, volume: number) {
        if (!this.audioContext || !this.sfxGain) return;

        // Create a simple bell-like tone for UI sounds
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        const filter = this.audioContext.createBiquadFilter();

        osc.type = 'sine';
        osc.frequency.value = frequency;

        // Light high-pass filtering for brightness
        filter.type = 'highpass';
        filter.frequency.value = 300;
        filter.Q.value = 0.3;

        // Bell-like envelope: quick attack, natural decay
        gain.gain.setValueAtTime(0, this.audioContext.currentTime);
        gain.gain.linearRampToValueAtTime(volume, this.audioContext.currentTime + 0.005);
        gain.gain.exponentialRampToValueAtTime(volume * 0.3, this.audioContext.currentTime + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);

        osc.connect(filter);
        filter.connect(gain);
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