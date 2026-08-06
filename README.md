# Atlas Design

Atlas Design is a visual study and a collection of standalone web components inspired by the Atlas aesthetic from *No Man's Sky*.

## Contents

- `color-study.html` — the complete visual study
- `components/atlas-core` — WebGL Atlas sphere
- `components/atlas-loader-core` — radial loading core
- `components/atlas-loader` — composed Atlas loading visualization
- `DESIGN.md` — design language and implementation notes

## Preview

Serve the repository with any static file server, then open `color-study.html`:

```sh
python3 -m http.server 8000
```

Individual component demos are available from each component's `index.html`.

## Dependencies

The demos use the vendored `vendor/three.min.js`, so no package installation or build step is required.
