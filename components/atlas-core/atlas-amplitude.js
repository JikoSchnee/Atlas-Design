/* Temporary tuning aid. X sets inner amplitude; upward Y sets shell amplitude. */
window.AtlasAmplitude = {
  mount(root, cores) {
    const pad = root.querySelector('.amplitude-pad');
    const stick = root.querySelector('.amplitude-stick');
    const output = root.querySelector('output');
    let inner = .08, outer = .10, pointer = null;
    const clamp = (x, max) => Math.max(0, Math.min(max, x));
    const update = () => {
      stick.style.left = `${inner * 100}%`;
      stick.style.top = `${(1 - outer) * 100}%`;
      output.textContent = `Inner ${(inner * 100).toFixed(1)}% · Outer ${(outer * 100).toFixed(1)}%`;
      cores.forEach(core => core?.setAmplitude({ inner, outer }));
    };
    const move = event => {
      const rect = pad.getBoundingClientRect();
      inner = clamp((event.clientX - rect.left) / rect.width, 1);
      outer = clamp((1 - (event.clientY - rect.top) / rect.height), 1);
      update();
    };
    pad.addEventListener('pointerdown', event => {
      if (event.button !== 0 || pointer !== null) return;
      event.preventDefault();
      pointer = event.pointerId;
      pad.setPointerCapture(pointer);
      pad.focus({ preventScroll: true });
      move(event);
    });
    pad.addEventListener('pointermove', event => { if (event.pointerId === pointer) move(event); });
    for (const type of ['pointerup', 'pointercancel', 'lostpointercapture']) pad.addEventListener(type, event => {
      if (event.pointerId !== pointer) return;
      if (pad.hasPointerCapture(pointer)) pad.releasePointerCapture(pointer);
      pointer = null;
    });
    const reset = () => { inner = .08; outer = .10; update(); };
    root.querySelector('[data-amplitude-reset]').addEventListener('click', reset);
    pad.addEventListener('keydown', event => {
      if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home'].includes(event.key)) return;
      event.preventDefault();
      if (event.key === 'Home') { reset(); return; }
      const step = event.shiftKey ? .01 : .005;
      if (event.key === 'ArrowLeft') inner = clamp(inner - step, 1);
      if (event.key === 'ArrowRight') inner = clamp(inner + step, 1);
      if (event.key === 'ArrowUp') outer = clamp(outer + step, 1);
      if (event.key === 'ArrowDown') outer = clamp(outer - step, 1);
      update();
    });
    update();
  }
};
