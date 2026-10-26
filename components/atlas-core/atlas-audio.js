/* One streaming soundtrack and analyser, shared by every Atlas Core instance. */
window.AtlasAudio = {
  mount(root) {
    const audio = root.querySelector('[data-audio-track]');
    const mute = root.querySelector('[data-audio-mute]');
    const volume = root.querySelector('[data-audio-volume]');
    const status = root.querySelector('[data-audio-status]');
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    const events = new AbortController();
    const unlockEvents = new AbortController();
    let context, gain, analyser, mediaSource, bins, waveform;
    let destroyed = false, pending = null, previousTime = null, sampledAt = null;
    let lastVolume = Number(volume.value) || .7;
    const signal = { innerBass: 0, outerBass: 0, innerEnergy: 0, outerEnergy: 0 };
    audio.volume = Number(volume.value);

    const updateState = () => {
      if (destroyed) return;
      const isMuted = audio.muted || Number(volume.value) === 0;
      mute.classList.toggle('is-muted', isMuted);
      mute.setAttribute('aria-pressed', String(isMuted));
      const label = isMuted ? 'Unmute music' : 'Mute music';
      mute.setAttribute('aria-label', label);
      mute.title = label;
      if (audio.error) {
        root.dataset.playback = 'error';
        status.textContent = 'Music could not load. Reload the page to try again.';
        mute.disabled = true;
        volume.disabled = true;
      } else if (!audio.paused && (!context || context.state === 'running')) {
        root.dataset.playback = 'playing';
        status.textContent = isMuted ? 'Music muted.' : 'Playing End of the World Sun by 65daysofstatic.';
        unlockEvents.abort();
      } else {
        root.dataset.playback = 'waiting';
        status.textContent = 'Music will start after your first interaction.';
      }
    };
    const ensureContext = () => {
      if (context || !AudioContextClass) return;
      context = new AudioContextClass();
      gain = context.createGain();
      gain.gain.value = Number(volume.value);
      analyser = context.createAnalyser();
      analyser.fftSize = 2048;
      analyser.smoothingTimeConstant = 0;
      bins = new Uint8Array(analyser.frequencyBinCount);
      waveform = new Float32Array(analyser.fftSize);
      mediaSource = context.createMediaElementSource(audio);
      mediaSource.connect(gain);
      gain.connect(analyser);
      analyser.connect(context.destination);
      audio.volume = 1;
      context.addEventListener('statechange', updateState, { signal: events.signal });
    };
    const start = () => {
      if (destroyed || audio.error) return Promise.resolve();
      // Resume is invoked synchronously inside the gesture, even when a prior
      // autoplay play() call is still waiting for the soundtrack to buffer.
      try {
        ensureContext();
        if (context && context.state !== 'running') context.resume().then(updateState).catch(updateState);
        if (pending) return pending;
        pending = audio.play().then(updateState).catch(updateState).finally(() => { pending = null; });
        return pending;
      } catch {
        updateState();
        return Promise.resolve();
      }
    };
    const updateVolume = () => {
      const value = Number(volume.value);
      if (value > 0) {
        lastVolume = value;
        audio.muted = false;
      }
      if (gain) gain.gain.setTargetAtTime(value, context.currentTime, .015);
      else audio.volume = value;
      updateState();
      start();
    };
    const toggleMute = () => {
      if (audio.muted || Number(volume.value) === 0) {
        audio.muted = false;
        if (Number(volume.value) === 0) { volume.value = String(lastVolume); updateVolume(); }
      } else audio.muted = true;
      updateState();
      start();
    };
    const read = time => {
      if (sampledAt === time) return signal;
      sampledAt = time;
      const dt = previousTime === null ? 1 / 60 : Math.max(0, Math.min(.1, (time - previousTime) / 1000));
      previousTime = time;
      let bass = 0, energy = 0;
      if (!destroyed && analyser && context.state === 'running' && !audio.paused && !audio.muted && Number(volume.value) > 0) {
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
    mute.addEventListener('click', toggleMute, { signal: events.signal });
    volume.addEventListener('input', updateVolume, { signal: events.signal });
    for (const name of ['playing', 'pause', 'error', 'volumechange']) audio.addEventListener(name, updateState, { signal: events.signal });
    for (const name of ['pointerdown', 'keydown']) document.addEventListener(name, start, { capture: true, signal: unlockEvents.signal });
    start();
    return {
      read,
      start,
      pause() { audio.pause(); },
      destroy() {
        if (destroyed) return;
        destroyed = true;
        events.abort();
        unlockEvents.abort();
        audio.pause();
        audio.removeAttribute('src');
        audio.load();
        mediaSource?.disconnect();
        gain?.disconnect();
        analyser?.disconnect();
        if (context && context.state !== 'closed') context.close().catch(() => {});
        mute.disabled = true;
        volume.disabled = true;
      }
    };
  }
};
