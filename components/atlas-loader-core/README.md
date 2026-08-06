# Atlas Loader Core

独立的红色加载核心组件，包含红色环境光、两个红色内圈，以及会平滑变白并向外生长的径向刻度波峰。

```html
<link rel="stylesheet" href="./atlas-loader-core.css" />
<svg viewBox="150 155 180 180">
  <g data-atlas-loader-core></g>
</svg>
<script src="./atlas-loader-core.js"></script>
<script>window.AtlasLoaderCore.mountAll();</script>
```

`mount(root, options)` 支持 `centerX`、`centerY`、`auraRadius`、`primaryRadius`、`secondaryRadius`、`innerRadius`、`baseLength`、`peakGrowth`、`barCount`、`rotationDuration` 和 `waveWidth`。
