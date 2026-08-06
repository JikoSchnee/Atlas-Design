/* AtlasLoaderCore — reusable red signal core with animated radial crest. */
(() => {
  const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
  let instanceCount = 0;

  const numberOption = (root, options, name, fallback) => {
    const value = options[name] ?? root.dataset[name];
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  };

  const mount = (root, options = {}) => {
    if (!root || root.dataset.atlasLoaderCoreMounted === 'true') return null;

    const ownerDocument = root.ownerDocument;
    const prefix = options.idPrefix || `atlas-loader-core-${++instanceCount}`;
    const centerX = numberOption(root, options, 'centerX', 240);
    const centerY = numberOption(root, options, 'centerY', 245);
    const auraRadius = numberOption(root, options, 'auraRadius', 105);
    const primaryRadius = numberOption(root, options, 'primaryRadius', 45);
    const secondaryRadius = numberOption(root, options, 'secondaryRadius', 52);
    const innerRadius = numberOption(root, options, 'innerRadius', 55.5);
    const baseLength = numberOption(root, options, 'baseLength', 9);
    const peakGrowth = numberOption(root, options, 'peakGrowth', 7);
    const barCount = numberOption(root, options, 'barCount', 70);
    const rotationDuration = numberOption(root, options, 'rotationDuration', 3200);
    const waveWidth = numberOption(root, options, 'waveWidth', 34);
    const auraId = `${prefix}-aura`;
    const particleGlowId = `${prefix}-particle-glow`;

    root.classList.add('atlas-loader-core');
    root.dataset.atlasLoaderCoreMounted = 'true';
    root.style.setProperty('--atlas-loader-core-particle-filter', `url(#${particleGlowId})`);
    root.innerHTML = `
      <defs>
        <radialGradient id="${auraId}">
          <stop offset="0" stop-color="#fa2a29" stop-opacity=".48" />
          <stop offset=".42" stop-color="#d41018" stop-opacity=".2" />
          <stop offset="1" stop-color="#7f0710" stop-opacity="0" />
        </radialGradient>
        <filter id="${particleGlowId}" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation=".8" result="particle-blur" />
          <feMerge><feMergeNode in="particle-blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <circle class="atlas-loader-core__aura" cx="${centerX}" cy="${centerY}" r="${auraRadius}" fill="url(#${auraId})" />
      <circle class="atlas-loader-core__ring" cx="${centerX}" cy="${centerY}" r="${primaryRadius}" />
      <circle class="atlas-loader-core__ring is-secondary" cx="${centerX}" cy="${centerY}" r="${secondaryRadius}" />
      <g class="atlas-loader-core__bars" aria-hidden="true"></g>
    `;

    const barsGroup = root.querySelector('.atlas-loader-core__bars');
    const angleStep = 360 / barCount;
    const bars = Array.from({ length: barCount }, (_, index) => {
      const line = ownerDocument.createElementNS(SVG_NAMESPACE, 'line');
      const angle = index * angleStep;
      line.setAttribute('class', 'atlas-loader-core__bar');
      line.setAttribute('x1', centerX + innerRadius);
      line.setAttribute('y1', centerY);
      line.setAttribute('x2', centerX + innerRadius + baseLength);
      line.setAttribute('y2', centerY);
      line.setAttribute('transform', `rotate(${angle} ${centerX} ${centerY})`);
      barsGroup.append(line);
      return { line, angle };
    });

    const render = (time = 0) => {
      const waveAngle = ((time % rotationDuration) / rotationDuration) * 360 - 90;
      bars.forEach(({ line, angle }) => {
        const angularDistance = Math.abs(((angle - waveAngle + 540) % 360) - 180);
        const proximity = Math.max(0, 1 - angularDistance / waveWidth);
        const influence = proximity * proximity * (3 - 2 * proximity);
        const colorMix = Math.pow(proximity, .62);
        const green = Math.round(90 + 163 * colorMix);
        const blue = Math.round(80 + 164 * colorMix);
        line.setAttribute('x2', (centerX + innerRadius + baseLength + peakGrowth * influence).toFixed(2));
        line.style.stroke = `rgb(255 ${green} ${blue})`;
      });
    };

    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frameId = 0;
    const animate = (time) => {
      render(time);
      frameId = requestAnimationFrame(animate);
    };
    const stop = () => {
      if (!frameId) return;
      cancelAnimationFrame(frameId);
      frameId = 0;
    };
    const syncMotion = () => {
      stop();
      if (motionPreference.matches) render(0);
      else if (!ownerDocument.hidden) frameId = requestAnimationFrame(animate);
    };

    ownerDocument.addEventListener('visibilitychange', syncMotion);
    motionPreference.addEventListener?.('change', syncMotion);
    syncMotion();

    return {
      root,
      destroy() {
        stop();
        ownerDocument.removeEventListener('visibilitychange', syncMotion);
        motionPreference.removeEventListener?.('change', syncMotion);
        root.replaceChildren();
        delete root.dataset.atlasLoaderCoreMounted;
      }
    };
  };

  const mountAll = (selector = '[data-atlas-loader-core]', options = {}) =>
    Array.from(document.querySelectorAll(selector), (root) => mount(root, options));

  window.AtlasLoaderCore = { mount, mountAll };
})();
