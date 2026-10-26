/* One local audio player and analyser, shared by every Atlas Core instance. */
window.AtlasAudio = {
  mount(root) {
    const input = root.querySelector('input[type="file"]');
    const play = root.querySelector('[data-audio-play]');
    const volume = root.querySelector('[data-audio-volume]');
    const track = root.querySelector('[data-audio-track]');
    const status = root.querySelector('[data-audio-status]');
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    const events = new AbortController();
    let context, gain, analyser, bins, waveform, buffer, source;
    let offset = 0, startedAt = 0, revision = 0, destroyed = false;
    let previousTime = null, sampledAt = null;
    const signal = { innerBass: 0, outerBass: 0, innerEnergy: 0, outerEnergy: 0 };

    const setStatus = text => { status.textContent = text; };
    const stopSource = () => {
      const old = source;
      source = null;
      if (old) {
        old.onended = null;
        old.stop();
        old.disconnect();
      }
      play.textContent = 'Play';
      play.setAttribute('aria-pressed', 'false');
    };
    const pause = () => {
      if (!source) return;
      offset = Math.min(buffer.duration, offset + context.currentTime - startedAt);
      stopSource();
      setStatus('Paused. Select Play to continue.');
    };
    const ensureContext = () => {
      if (context) return;
      context = new AudioContextClass();
      gain = context.createGain();
      gain.gain.value = Number(volume.value);
      analyser = context.createAnalyser();
      analyser.fftSize = 2048;
      analyser.smoothingTimeConstant = 0;
      bins = new Uint8Array(analyser.frequencyBinCount);
      waveform = new Float32Array(analyser.fftSize);
      gain.connect(analyser);
      analyser.connect(context.destination);
    };
    const selectFile = async () => {
      const file = input.files[0];
      if (!file || destroyed) return;
      const selection = ++revision;
      stopSource();
      buffer = null;
      offset = 0;
      play.disabled = true;
      track.textContent = file.name;
      track.title = file.name;
      setStatus('Loading local audio…');
      try {
        ensureContext();
        const decoded = await context.decodeAudioData(await file.arrayBuffer());
        if (destroyed || selection !== revision) return;
        if (!decoded.duration) throw new Error('Empty audio');
        buffer = decoded;
        play.disabled = false;
        setStatus('Ready. Select Play to start.');
      } catch {
        if (destroyed || selection !== revision) return;
        setStatus('Unable to decode this file. Try an MP3, WAV, or M4A file.');
      } finally {
        // Allow selecting the same file again, including after a decode failure.
        if (!destroyed && selection === revision) input.value = '';
      }
    };
    const toggle = async () => {
      if (!buffer || destroyed) return;
      if (source) { pause(); return; }
      const selection = revision;
      play.disabled = true;
      try {
        // Called directly by a click: Safari requires a user gesture to resume.
        await context.resume();
        if (destroyed || selection !== revision) return;
        if (context.state !== 'running') throw new Error('Audio unavailable');
        if (offset >= buffer.duration) offset = 0;
        const next = context.createBufferSource();
        next.buffer = buffer;
        next.connect(gain);
        next.onended = () => {
          if (source !== next) return;
          source = null;
          next.disconnect();
          offset = 0;
          play.textContent = 'Play';
          play.setAttribute('aria-pressed', 'false');
          setStatus('Track ended. Select Play to replay.');
        };
        source = next;
        startedAt = context.currentTime;
        next.start(0, offset);
        play.textContent = 'Pause';
        play.setAttribute('aria-pressed', 'true');
        setStatus('Playing locally. Both cores follow this track.');
      } catch {
        if (!destroyed && selection === revision) {
          stopSource();
          setStatus('Playback could not start. Select Play to try again.');
        }
      } finally {
        if (!destroyed && selection === revision) play.disabled = !buffer;
      }
    };
    const read = time => {
      // rAF gives both cores the same timestamp: sample and smooth only once.
      if (sampledAt === time) return signal;
      sampledAt = time;
      const dt = previousTime === null ? 1 / 60 : Math.max(0, Math.min(.1, (time - previousTime) / 1000));
      previousTime = time;
      let bass = 0, energy = 0;
      if (!destroyed && source && context.state === 'running' && Number(volume.value) > 0) {
        analyser.getByteFrequencyData(bins);
        analyser.getFloatTimeDomainData(waveform);
        const binHz = context.sampleRate / analyser.fftSize;
        const first = Math.max(1, Math.ceil(30 / binHz));
        const last = Math.min(bins.length - 1, Math.floor(180 / binHz));
        for (let i = first; i <= last; i++) bass += bins[i] / 255;
        bass = Math.min(1, bass / Math.max(1, last - first + 1));
        for (const value of waveform) energy += value * value;
        energy = Math.min(1, Math.sqrt(energy / waveform.length) * 4);
      }
      const smooth = (key, target, attack, release) => {
        const tau = target > signal[key] ? attack : release;
        signal[key] += (target - signal[key]) * (1 - Math.exp(-dt / tau));
      };
      smooth('innerBass', bass, .04, .18);
      smooth('innerEnergy', energy, .04, .18);
      smooth('outerBass', bass, .16, .45);
      smooth('outerEnergy', energy, .16, .45);
      return signal;
    };
    const updateVolume = () => {
      if (gain) gain.gain.setTargetAtTime(Number(volume.value), context.currentTime, .015);
    };
    input.addEventListener('change', selectFile, { signal: events.signal });
    play.addEventListener('click', toggle, { signal: events.signal });
    volume.addEventListener('input', updateVolume, { signal: events.signal });
    play.setAttribute('aria-pressed', 'false');
    if (!AudioContextClass) {
      input.disabled = true;
      setStatus('Audio analysis is unavailable in this browser.');
    }
    return {
      read,
      pause,
      destroy() {
        if (destroyed) return;
        destroyed = true;
        revision++;
        events.abort();
        stopSource();
        buffer = null;
        gain?.disconnect();
        analyser?.disconnect();
        if (context && context.state !== 'closed') context.close().catch(() => {});
        play.disabled = true;
      }
    };
  }
};
