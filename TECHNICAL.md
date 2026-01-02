# 🔧 Technical Documentation - Voice Generator PWA

## Developer Guide for Live Real-Time Audio Processing

---

## Architecture Overview

### Audio Signal Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                      INPUT LAYER                                 │
│  navigator.mediaDevices.getUserMedia()                          │
│  ↓                                                               │
│  MediaStream (microphone audio)                                 │
└─────────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────────┐
│                   AUDIO CONTEXT LAYER                            │
│  AudioContext / webkitAudioContext                              │
│  - Sample Rate: 48000 Hz                                        │
│  - Channels: 2 (Stereo)                                         │
│  - Buffer Size: Dynamic (browser managed)                       │
└─────────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────────┐
│                   ANALYSIS LAYER                                 │
│  ┌──────────────────┐                                           │
│  │ InputAnalyser    │  AnalyserNode                             │
│  │ - FFT: 2048      │  For level metering                       │
│  │ - Smoothing: 0.8 │  and visualization                        │
│  └──────────────────┘                                           │
└─────────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────────┐
│                   EFFECTS PROCESSING LAYER                       │
│                                                                  │
│  ┌─────────────────────────────────────────────────┐            │
│  │  1. Bass EQ (BiquadFilterNode)                  │            │
│  │     - Type: lowshelf                            │            │
│  │     - Frequency: 200 Hz                         │            │
│  │     - Gain: -12 to +12 dB                       │            │
│  └─────────────────────────────────────────────────┘            │
│                        ↓                                         │
│  ┌─────────────────────────────────────────────────┐            │
│  │  2. Treble EQ (BiquadFilterNode)                │            │
│  │     - Type: highshelf                           │            │
│  │     - Frequency: 3000 Hz                        │            │
│  │     - Gain: -12 to +12 dB                       │            │
│  └─────────────────────────────────────────────────┘            │
│                        ↓                                         │
│  ┌─────────────────────────────────────────────────┐            │
│  │  3. Reverb (ConvolverNode)                      │            │
│  │     - Impulse Response: 2 seconds               │            │
│  │     - Algorithm: Synthetic decay                │            │
│  │     - Channels: 2 (Stereo)                      │            │
│  └─────────────────────────────────────────────────┘            │
│                        ↓                                         │
│  ┌─────────────────────────────────────────────────┐            │
│  │  4. Delay (DelayNode + Feedback)                │            │
│  │     - Max Delay: 5 seconds                      │            │
│  │     - Delay Time: 0 to 0.5 seconds              │            │
│  │     - Feedback: 0 to 60%                        │            │
│  └─────────────────────────────────────────────────┘            │
│                        ↓                                         │
│  ┌─────────────────────────────────────────────────┐            │
│  │  5. Dry/Wet Mixer (GainNodes)                   │            │
│  │     - Dry Path: Original signal                 │            │
│  │     - Wet Path: Processed signal                │            │
│  │     - Mix Ratio: 0-100%                         │            │
│  └─────────────────────────────────────────────────┘            │
└─────────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────────┐
│                   OUTPUT LAYER                                   │
│  ┌──────────────────┐                                           │
│  │ OutputAnalyser   │  AnalyserNode                             │
│  │ - For meters     │  For output monitoring                    │
│  └──────────────────┘                                           │
│           ↓                    ↓                                 │
│  ┌─────────────────┐  ┌────────────────────────┐               │
│  │ Live Monitoring │  │ Recording Destination  │               │
│  │ (Toggle)        │  │ MediaStreamDestination │               │
│  │ audioContext    │  │ → MediaRecorder        │               │
│  │ .destination    │  │ → Blob (WebM)          │               │
│  └─────────────────┘  └────────────────────────┘               │
└─────────────────────────────────────────────────────────────────┘
```

---

## Key Classes and Functions

### 1. Audio Context Management

```javascript
// Initialize AudioContext
let audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Resume if suspended (required by some browsers)
if (audioContext.state === 'suspended') {
  await audioContext.resume();
}

// Check latency
const latency = audioContext.baseLatency * 1000; // milliseconds
console.log('Audio latency:', latency, 'ms');
```

### 2. Effects Chain Setup

```javascript
function setupAudioChain(stream) {
  // Create nodes
  inputSource = audioContext.createMediaStreamSource(stream);
  inputAnalyser = audioContext.createAnalyser();
  outputAnalyser = audioContext.createAnalyser();
  
  // EQ Filters
  bassEQ = audioContext.createBiquadFilter();
  bassEQ.type = 'lowshelf';
  bassEQ.frequency.value = 200;
  bassEQ.gain.value = 0;
  
  trebleEQ = audioContext.createBiquadFilter();
  trebleEQ.type = 'highshelf';
  trebleEQ.frequency.value = 3000;
  trebleEQ.gain.value = 0;
  
  // Reverb
  reverbNode = audioContext.createConvolver();
  createReverbImpulse(); // Generate impulse response
  
  // Delay/Echo
  delayNode = audioContext.createDelay(5.0);
  delayNode.delayTime.value = 0;
  feedbackGain = audioContext.createGain();
  feedbackGain.gain.value = 0;
  
  // Dry/Wet Mix
  dryGain = audioContext.createGain();
  dryGain.gain.value = 1;
  wetGain = audioContext.createGain();
  wetGain.gain.value = 1;
  
  // Output
  outputGain = audioContext.createGain();
  outputGain.gain.value = 0.8;
  
  // Recording destination
  mediaStreamDestination = audioContext.createMediaStreamDestination();
  
  // Connect chain
  connectAudioNodes();
}

function connectAudioNodes() {
  // Input → Analyser
  inputSource.connect(inputAnalyser);
  
  // Dry path (bypass effects)
  inputAnalyser.connect(dryGain);
  
  // Wet path (through effects)
  inputAnalyser.connect(bassEQ);
  bassEQ.connect(trebleEQ);
  trebleEQ.connect(reverbNode);
  reverbNode.connect(delayNode);
  delayNode.connect(feedbackGain);
  feedbackGain.connect(delayNode); // Feedback loop
  delayNode.connect(wetGain);
  
  // Mix dry + wet
  dryGain.connect(outputGain);
  wetGain.connect(outputGain);
  
  // Output
  outputGain.connect(outputAnalyser);
  outputAnalyser.connect(mediaStreamDestination);
  
  // Live monitoring is connected on-demand
  // outputGain.connect(audioContext.destination) when enabled
}
```

### 3. Live Monitoring Toggle

```javascript
function toggleMonitoring() {
  if (!isRecording) return;
  
  isMonitoring = !isMonitoring;
  
  if (isMonitoring) {
    // Connect to speakers
    outputGain.connect(audioContext.destination);
    console.log('Live monitoring ON');
  } else {
    // Disconnect from speakers
    outputGain.disconnect(audioContext.destination);
    console.log('Live monitoring OFF');
  }
  
  updateMonitoringUI(isMonitoring);
}
```

### 4. Real-Time Effect Updates

```javascript
function updateEffectRealtime(effect, value) {
  if (!isRecording || !audioContext) return;
  
  const floatValue = parseFloat(value);
  
  switch(effect) {
    case 'reverb':
      // Reverb amount controlled via wet gain
      // (simplified approach)
      break;
      
    case 'echo':
      const echoAmount = floatValue / 100;
      delayNode.delayTime.value = echoAmount * 0.5; // 0-500ms
      feedbackGain.gain.value = echoAmount * 0.6;   // 0-60%
      break;
      
    case 'pitch':
      // Pitch shifting requires advanced techniques:
      // - Granular synthesis
      // - AudioWorklet
      // - External library (Tone.js, Pizzicato.js)
      // Not implemented in this basic version
      console.warn('Real-time pitch shift not implemented');
      break;
      
    case 'bass':
      bassEQ.gain.value = floatValue; // -12 to +12 dB
      break;
      
    case 'treble':
      trebleEQ.gain.value = floatValue; // -12 to +12 dB
      break;
      
    case 'mix':
      const mixAmount = floatValue / 100;
      dryGain.gain.value = 1 - mixAmount;
      wetGain.gain.value = mixAmount;
      break;
  }
}
```

### 5. Reverb Impulse Response Generation

```javascript
function createReverbImpulse() {
  const sampleRate = audioContext.sampleRate;
  const length = sampleRate * 2; // 2 seconds
  const impulse = audioContext.createBuffer(2, length, sampleRate);
  
  for (let channel = 0; channel < 2; channel++) {
    const channelData = impulse.getChannelData(channel);
    for (let i = 0; i < length; i++) {
      // Exponential decay with random noise
      const decay = Math.pow(1 - i / length, 2);
      channelData[i] = (Math.random() * 2 - 1) * decay;
    }
  }
  
  reverbNode.buffer = impulse;
}
```

### 6. Visualization - Waveform

```javascript
function startWaveformVisualization() {
  const canvas = document.getElementById('waveform');
  const ctx = canvas.getContext('2d');
  const dataArray = new Uint8Array(outputAnalyser.frequencyBinCount);
  
  function draw() {
    waveformAnimationId = requestAnimationFrame(draw);
    
    outputAnalyser.getByteTimeDomainData(dataArray);
    
    // Clear with fade effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw waveform
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#8b5cf6';
    ctx.beginPath();
    
    const sliceWidth = canvas.width / dataArray.length;
    let x = 0;
    
    for (let i = 0; i < dataArray.length; i++) {
      const v = dataArray[i] / 128.0;
      const y = (v * canvas.height) / 2;
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
      
      x += sliceWidth;
    }
    
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();
  }
  
  draw();
}
```

### 7. Level Meters

```javascript
function startMetersVisualization() {
  const inputMeter = document.getElementById('inputMeter');
  const outputMeter = document.getElementById('outputMeter');
  const inputLevel = document.getElementById('inputLevel');
  const outputLevel = document.getElementById('outputLevel');
  
  const inputDataArray = new Uint8Array(inputAnalyser.frequencyBinCount);
  const outputDataArray = new Uint8Array(outputAnalyser.frequencyBinCount);
  
  function update() {
    metersAnimationId = requestAnimationFrame(update);
    
    // Input meter
    inputAnalyser.getByteFrequencyData(inputDataArray);
    const inputAvg = inputDataArray.reduce((a, b) => a + b) / inputDataArray.length;
    const inputPercentage = (inputAvg / 255) * 100;
    const inputDb = 20 * Math.log10(Math.max(inputAvg / 255, 0.00001));
    
    inputMeter.style.width = inputPercentage + '%';
    inputLevel.textContent = Math.round(inputDb) + ' dB';
    
    // Output meter
    outputAnalyser.getByteFrequencyData(outputDataArray);
    const outputAvg = outputDataArray.reduce((a, b) => a + b) / outputDataArray.length;
    const outputPercentage = (outputAvg / 255) * 100;
    const outputDb = 20 * Math.log10(Math.max(outputAvg / 255, 0.00001));
    
    outputMeter.style.width = outputPercentage + '%';
    outputLevel.textContent = Math.round(outputDb) + ' dB';
  }
  
  update();
}
```

---

## Performance Optimization

### 1. Throttling Slider Updates

```javascript
let sliderUpdateTimeout = null;

slider.addEventListener('input', (e) => {
  const value = e.target.value;
  
  // Update UI immediately (visual feedback)
  updateEffectValue('reverb', value);
  
  // Throttle audio updates (avoid too frequent changes)
  clearTimeout(sliderUpdateTimeout);
  sliderUpdateTimeout = setTimeout(() => {
    updateEffectRealtime('reverb', value);
  }, 16); // ~60 FPS
});
```

### 2. AudioWorklet (Future Enhancement)

For lower latency and better performance:

```javascript
// Load AudioWorklet processor
await audioContext.audioWorklet.addModule('audio-processor.js');

// Create worklet node
const workletNode = new AudioWorkletNode(audioContext, 'audio-processor');

// Connect
inputSource.connect(workletNode);
workletNode.connect(audioContext.destination);
```

---

## Browser Compatibility

### Supported Features

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| Web Audio API | ✅ 90+ | ✅ 88+ | ✅ 14+ | ✅ 90+ |
| MediaRecorder | ✅ 90+ | ✅ 88+ | ✅ 14+ | ✅ 90+ |
| getUserMedia | ✅ 90+ | ✅ 88+ | ✅ 14+ | ✅ 90+ |
| AudioWorklet | ✅ 66+ | ✅ 76+ | ✅ 14.1+ | ✅ 79+ |
| Service Worker | ✅ 90+ | ✅ 88+ | ✅ 11.1+ | ✅ 90+ |

### Polyfills

```javascript
// AudioContext
window.AudioContext = window.AudioContext || window.webkitAudioContext;

// getUserMedia
navigator.mediaDevices = navigator.mediaDevices || {
  getUserMedia: (constraints) => {
    const getUserMedia = navigator.webkitGetUserMedia || 
                        navigator.mozGetUserMedia;
    if (!getUserMedia) {
      return Promise.reject(new Error('getUserMedia not supported'));
    }
    return new Promise((resolve, reject) => {
      getUserMedia.call(navigator, constraints, resolve, reject);
    });
  }
};
```

---

## Security Considerations

### 1. Microphone Permission

```javascript
// Request with error handling
try {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  // Success
} catch (error) {
  if (error.name === 'NotAllowedError') {
    alert('❌ Microphone permission denied');
  } else if (error.name === 'NotFoundError') {
    alert('🎤 No microphone found');
  } else {
    alert('❌ Error: ' + error.message);
  }
}
```

### 2. HTTPS Required

```javascript
// Check if running on HTTPS
if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
  alert('⚠️ HTTPS required for microphone access');
}
```

### 3. Content Security Policy

```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline'; 
               style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; 
               font-src 'self' https://fonts.gstatic.com; 
               media-src 'self' blob:;">
```

---

## Testing

### Unit Tests (Example with Jest)

```javascript
describe('Audio Effects', () => {
  let audioContext;
  
  beforeEach(() => {
    audioContext = new AudioContext();
  });
  
  afterEach(() => {
    audioContext.close();
  });
  
  test('Bass EQ should change gain', () => {
    const bassEQ = audioContext.createBiquadFilter();
    bassEQ.type = 'lowshelf';
    bassEQ.gain.value = 5;
    
    expect(bassEQ.gain.value).toBe(5);
  });
  
  test('Delay should set time correctly', () => {
    const delay = audioContext.createDelay(5.0);
    delay.delayTime.value = 0.3;
    
    expect(delay.delayTime.value).toBe(0.3);
  });
});
```

---

## Future Enhancements

### 1. Real-Time Pitch Shifting

Use **AudioWorklet** with pitch detection and granular synthesis:

```javascript
// audio-pitch-shifter.js (AudioWorklet)
class PitchShifterProcessor extends AudioWorkletProcessor {
  process(inputs, outputs, parameters) {
    const input = inputs[0];
    const output = outputs[0];
    
    // Implement pitch shifting algorithm
    // (e.g., WSOLA, Phase Vocoder)
    
    return true;
  }
}

registerProcessor('pitch-shifter', PitchShifterProcessor);
```

### 2. Advanced Reverb

Use **convolution with real impulse responses**:

```javascript
// Load real IR (Impulse Response)
const response = await fetch('impulse-responses/concert-hall.wav');
const arrayBuffer = await response.arrayBuffer();
const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

reverbNode.buffer = audioBuffer;
```

### 3. Compressor/Limiter

```javascript
const compressor = audioContext.createDynamicsCompressor();
compressor.threshold.value = -50;  // dB
compressor.knee.value = 40;        // dB
compressor.ratio.value = 12;       // :1
compressor.attack.value = 0.003;   // seconds
compressor.release.value = 0.25;   // seconds

// Insert in chain
outputGain.connect(compressor);
compressor.connect(audioContext.destination);
```

---

## Resources

- [Web Audio API Specification](https://www.w3.org/TR/webaudio/)
- [MDN Web Audio Guide](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- [AudioWorklet Examples](https://googlechromelabs.github.io/web-audio-samples/audio-worklet/)
- [Tone.js Library](https://tonejs.github.io/)
- [Web Audio Weekly](https://www.webaudioweekly.com/)

---

**Built with Web Audio API • PWA • Vanilla JavaScript**

*For more information, see README.md*