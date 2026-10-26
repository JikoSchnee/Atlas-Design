# Atlas Design

A visual study and standalone web components inspired by the Atlas aesthetic from *No Man's Sky*.

## Live site

[Open Atlas Design](https://jikoschnee.github.io/Atlas-Design/)

[Open the chromatic study directly](https://jikoschnee.github.io/Atlas-Design/color-study.html)

## Reference preview

Screenshot of the chromatic study, including the Atlas sphere, color palette, and portal glyphs.

![Atlas chromatic study](docs/preview.png)

## Contents

- `index.html` — redirects to the chromatic study.
- `color-study.html` — the complete visual study.
- `components/atlas-core` — WebGL Atlas sphere.
- `components/atlas-loader-core` — radial loading core.
- `components/atlas-loader` — composed loading visualization.
- `DESIGN.md` — design language and implementation notes.

## Local preview

```sh
python3 -m http.server 8000
```

Open `http://localhost:8000/`. Individual component demos are available from each component's `index.html`. The demos use the local `vendor/three.min.js`; no installation or build step is required.

## Deployment

GitHub Actions publishes the repository to GitHub Pages after each push to `main`. The workflow can also be run manually.

## Design references

Atlas Path imagery from the official [No Man's Sky OMEGA Update](https://www.nomanssky.com/omega-update/) and historical Atlas Interface captures informed the palette and luminous boundaries. No Man's Sky imagery and related marks belong to their respective owners.
