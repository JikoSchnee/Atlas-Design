# Atlas Loader

独立的 Atlas 加载可视化组件，只包含暗红舞台、八面体线框、四个渐亮顶点、两个外圈流星、一个内圈流星，以及组合的 `AtlasLoaderCore` 红色核心。标题、说明文字和页面间距不属于组件。

```html
<link rel="stylesheet" href="../atlas-loader-core/atlas-loader-core.css" />
<link rel="stylesheet" href="./atlas-loader.css" />
<div data-atlas-loader data-inner-orbit-radius="90"></div>
<script src="../atlas-loader-core/atlas-loader-core.js"></script>
<script src="./atlas-loader.js"></script>
<script>window.AtlasLoader.mountAll();</script>
```

可通过 `data-inner-orbit-radius` 调整内圈白色轨道半径，通过 `data-core-offset-y` 调整核心纵向位置。`mount(host, { core: { ... } })` 可继续传入红色核心组件参数。
