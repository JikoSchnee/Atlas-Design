/* AtlasLoader — isolated octahedral loading visual composed with AtlasLoaderCore. */
(() => {
  const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
  let instanceCount = 0;

  const numericValue = (value, fallback) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  };

  const edgeGradient = (id, x1, y1, x2, y2) => `
    <linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">
      <stop offset="0" stop-color="#fffdf4" stop-opacity=".9" />
      <stop offset=".12" stop-color="#fffdf4" stop-opacity=".12" />
      <stop offset=".42" stop-color="#fffdf4" stop-opacity="0" />
      <stop offset=".58" stop-color="#fffdf4" stop-opacity="0" />
      <stop offset=".88" stop-color="#fffdf4" stop-opacity=".12" />
      <stop offset="1" stop-color="#fffdf4" stop-opacity=".9" />
    </linearGradient>`;

  const mount = (host, options = {}) => {
    if (!host || host.dataset.atlasLoaderMounted === 'true') return null;
    if (!window.AtlasLoaderCore) {
      console.warn('AtlasLoader requires AtlasLoaderCore.');
      return null;
    }

    const prefix = options.idPrefix || `atlas-loader-${++instanceCount}`;
    const coreOffsetY = numericValue(options.coreOffsetY ?? host.dataset.coreOffsetY, 40);
    const innerOrbitRadius = numericValue(options.innerOrbitRadius ?? host.dataset.innerOrbitRadius, 90);
    const svgTitleId = `${prefix}-svg-title`;
    const svgDescriptionId = `${prefix}-svg-description`;
    const wireFadeId = `${prefix}-wire-fade`;
    const wireMaskId = `${prefix}-wire-mask`;
    const vertexGlowId = `${prefix}-vertex-glow`;
    const edgeIds = {
      topRight: `${prefix}-edge-top-right`,
      bottomRight: `${prefix}-edge-bottom-right`,
      bottomLeft: `${prefix}-edge-bottom-left`,
      topLeft: `${prefix}-edge-top-left`
    };

    host.classList.add('atlas-loader-stage');
    host.dataset.atlasLoaderMounted = 'true';
    if (!host.hasAttribute('aria-label')) host.setAttribute('aria-label', 'Atlas-inspired red orbital loading animation');
    host.style.setProperty('--atlas-loader-core-y', `${coreOffsetY}px`);
    host.style.setProperty('--atlas-loader-vertex-filter', `url(#${vertexGlowId})`);
    host.innerHTML = `
      <svg class="atlas-loader" viewBox="0 0 480 600" role="img" aria-labelledby="${svgTitleId} ${svgDescriptionId}">
          <title id="${svgTitleId}">Atlas orbital loading signal</title>
          <desc id="${svgDescriptionId}">An elongated wireframe octahedron viewed from slightly above, with a red calibrated loading ring across its central plane and structural lines fading near the red core.</desc>
          <defs>
            <radialGradient id="${wireFadeId}" gradientUnits="userSpaceOnUse" cx="240" cy="245" r="150">
              <stop offset="0" stop-color="#000" />
              <stop offset=".54" stop-color="#000" />
              <stop offset=".72" stop-color="#323232" />
              <stop offset=".88" stop-color="#b4b4b4" />
              <stop offset="1" stop-color="#fff" />
            </radialGradient>
            ${edgeGradient(edgeIds.topRight, 240, 35, 410, 245)}
            ${edgeGradient(edgeIds.bottomRight, 410, 245, 240, 575)}
            ${edgeGradient(edgeIds.bottomLeft, 240, 575, 70, 245)}
            ${edgeGradient(edgeIds.topLeft, 70, 245, 240, 35)}
            <mask id="${wireMaskId}" maskUnits="userSpaceOnUse" x="0" y="0" width="480" height="600" mask-type="luminance">
              <rect class="atlas-loader-wire-mask-field" width="480" height="600" fill="url(#${wireFadeId})" />
            </mask>
            <filter id="${vertexGlowId}" x="-120%" y="-120%" width="340%" height="340%">
              <feGaussianBlur stdDeviation=".8" result="vertex-blur" />
              <feMerge><feMergeNode in="vertex-blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          <g mask="url(#${wireMaskId})">
            <path class="atlas-loader-facet is-upper" d="M240 35 70 245 240 170Z" opacity=".56" />
            <path class="atlas-loader-facet is-upper" d="M240 35 240 170 410 245Z" opacity=".82" />
            <path class="atlas-loader-facet is-upper" d="M240 35 410 245 240 320Z" opacity=".38" />
            <path class="atlas-loader-facet is-upper" d="M240 35 240 320 70 245Z" opacity=".62" />
            <path class="atlas-loader-facet is-lower" d="M240 575 70 245 240 170Z" opacity=".28" />
            <path class="atlas-loader-facet is-lower" d="M240 575 240 170 410 245Z" opacity=".2" />
            <path class="atlas-loader-facet is-lower" d="M240 575 410 245 240 320Z" opacity=".72" />
            <path class="atlas-loader-facet is-lower" d="M240 575 240 320 70 245Z" opacity=".46" />
            <path class="atlas-loader-plane" d="M70 245 240 170 410 245 240 320Z" />
            <path class="atlas-loader-geometry" d="M240 35 410 245 240 575 70 245Z" />
            <path class="atlas-loader-depth" d="M240 35 240 320M70 245 240 320 410 245M240 575 240 320" />
            <path class="atlas-loader-depth is-rear" d="M240 35 240 170M70 245 240 170 410 245M240 575 240 170" />
            <path class="atlas-loader-axis" d="M240 35V575" />
          </g>
          <g aria-hidden="true">
            <path class="atlas-loader-vertex-edge" d="M240 35 410 245" stroke="url(#${edgeIds.topRight})" />
            <path class="atlas-loader-vertex-edge" d="M410 245 240 575" stroke="url(#${edgeIds.bottomRight})" />
            <path class="atlas-loader-vertex-edge" d="M240 575 70 245" stroke="url(#${edgeIds.bottomLeft})" />
            <path class="atlas-loader-vertex-edge" d="M70 245 240 35" stroke="url(#${edgeIds.topLeft})" />
          </g>
          <g class="atlas-loader-core-offset">
            <g data-atlas-loader-core></g>
            <circle class="atlas-loader-meteor-guide" data-inner-meteor-guide cx="240" cy="245" r="${innerOrbitRadius}" />
            <g data-inner-meteor aria-hidden="true"></g>
          </g>
          <path class="atlas-loader-meteor-guide" data-outer-meteor-guide d="M240 35 410 245 240 575 70 245Z" />
          <g data-outer-meteor-one aria-hidden="true"></g>
          <g data-outer-meteor-two aria-hidden="true"></g>
          <circle class="atlas-loader-vertex" cx="240" cy="35" r="1.15" />
          <circle class="atlas-loader-vertex" cx="240" cy="575" r="1.15" />
          <circle class="atlas-loader-vertex" cx="70" cy="245" r="1.15" />
          <circle class="atlas-loader-vertex" cx="410" cy="245" r="1.15" />
      </svg>`;

    const core = window.AtlasLoaderCore.mount(host.querySelector('[data-atlas-loader-core]'), {
      ...options.core,
      idPrefix: `${prefix}-core`
    });
    const createMeteor = (guide, group, meteorOptions) => {
      const segments = Array.from({ length: meteorOptions.segmentCount }, () => {
        const segment = document.createElementNS(SVG_NAMESPACE, 'line');
        segment.setAttribute('class', 'atlas-loader-meteor-segment');
        group.append(segment);
        return segment;
      });
      const point = document.createElementNS(SVG_NAMESPACE, 'circle');
      point.setAttribute('class', 'atlas-loader-meteor-point');
      point.setAttribute('r', meteorOptions.headRadius);
      group.append(point);
      return { guide, group, segments, point, pathLength: guide.getTotalLength(), ...meteorOptions };
    };

    const outerGuide = host.querySelector('[data-outer-meteor-guide]');
    const innerGuide = host.querySelector('[data-inner-meteor-guide]');
    const meteors = [
      createMeteor(outerGuide, host.querySelector('[data-outer-meteor-one]'), { duration: 8200, phase: 0, direction: -1, trailLength: 64, segmentCount: 44, headRadius: 1.05 }),
      createMeteor(outerGuide, host.querySelector('[data-outer-meteor-two]'), { duration: 8200, phase: .5, direction: -1, trailLength: 64, segmentCount: 44, headRadius: 1.05 }),
      createMeteor(innerGuide, host.querySelector('[data-inner-meteor]'), { duration: 4600, phase: .08, direction: 1, trailLength: 94, segmentCount: 56, headRadius: 1.15 })
    ];
    const wrapDistance = (distance, length) => ((distance % length) + length) % length;
    const render = (time = 0) => {
      meteors.forEach((meteor) => {
        const cycle = time / meteor.duration * meteor.direction + meteor.phase;
        const headDistance = wrapDistance(cycle, 1) * meteor.pathLength;
        meteor.segments.forEach((segment, index) => {
          const tailPosition = index / meteor.segments.length;
          const nextPosition = (index + 1) / meteor.segments.length;
          const startDistance = headDistance - meteor.direction * meteor.trailLength * (1 - tailPosition);
          const endDistance = headDistance - meteor.direction * meteor.trailLength * (1 - nextPosition);
          const start = meteor.guide.getPointAtLength(wrapDistance(startDistance, meteor.pathLength));
          const end = meteor.guide.getPointAtLength(wrapDistance(endDistance, meteor.pathLength));
          const strength = Math.pow((tailPosition + nextPosition) * .5, 2.35);
          segment.setAttribute('x1', start.x.toFixed(2));
          segment.setAttribute('y1', start.y.toFixed(2));
          segment.setAttribute('x2', end.x.toFixed(2));
          segment.setAttribute('y2', end.y.toFixed(2));
          segment.setAttribute('opacity', (.82 * strength).toFixed(3));
          segment.setAttribute('stroke-width', (.55 + strength * 1.05).toFixed(2));
        });
        const head = meteor.guide.getPointAtLength(headDistance);
        meteor.point.setAttribute('cx', head.x.toFixed(2));
        meteor.point.setAttribute('cy', head.y.toFixed(2));
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
      else if (!document.hidden) frameId = requestAnimationFrame(animate);
    };
    document.addEventListener('visibilitychange', syncMotion);
    motionPreference.addEventListener?.('change', syncMotion);
    syncMotion();

    return {
      host,
      core,
      destroy() {
        stop();
        core?.destroy();
        document.removeEventListener('visibilitychange', syncMotion);
        motionPreference.removeEventListener?.('change', syncMotion);
        host.replaceChildren();
        delete host.dataset.atlasLoaderMounted;
      }
    };
  };

  const mountAll = (selector = '[data-atlas-loader]', options = {}) =>
    Array.from(document.querySelectorAll(selector), (host) => mount(host, options));

  window.AtlasLoader = { mount, mountAll };
})();
