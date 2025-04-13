# chartjs-web-component

A bespoke and basic [Chart.js](https://www.chartjs.org/docs/latest/) Web Component wrapper.

## How it works

### Setup

Choose your invocation method:

- Inline HTML script call
- Importing the ESModule

#### Inline HTML `<script>`

Add the [src/wc-chart.mjs](./src/wc-chart.mjs) to the document context:

```html
<script type="module" src="./src/wc-chart.mjs"></script>
```

#### ESModule import

In your MJS manifest or bundle:

```javascript
import './src/wc-chart.mjs';
```

### Constructing the necessary HTML

This Web Component uses a Custom Element `wc-chart`:

```html
<wc-chart>
	<!-- … -->
</wc-chart>
```

You'll need to supply at least one JSON array of numerical values in a `<script type="application/json">` element. These values will form the basis for a series, plotted against the Y axis, and should use both a `data-axis="y"` and `data-label` attribute.

```html
<script
	type="application/json"
	data-axis="y"
	data-label="Progression">
	[1,1,2,3,5,8,13,21]
</script>
```

Finally, append these JSON `<script>` blocks to the `<wc-chart>` element, and set a desired type of chart using the `type` attribute.

```html
<wc-chart type="line">
	<script
		type="application/json"
		data-axis="y"
		data-label="Progression">
		[1,1,2,3,5,8,13,21]
	</script>
</wc-chart>
```

That's it. You've got a basic line chart with a single series.

### What the Web Component does next

As the Web Component's `connectedCallback` lifecycle function executes, it checks whether Chart.js is loaded into the `window` context.

If not, it loads the Chart.js library using its jsDeliver CDN offering.

It then creates a `canvas` element and then builds the Chart.js context within the Web Component.

## Benefits

- **Declarative**\
  Use the power of HTML to define and configure the chart
- **Light-weight**\
	Web Components work natively and don't require any extra libraries/frameworks
- **Isolation**\
	Each chart renders in its own context, and each page can have multiple charts without fear of collisions or race conditions
- **Efficiency**\
	A single `import` of the Chart.js library is made. (This will perform even better if you self-host this library on the same domain as your HTML.)

## Drawbacks

- **Too simple**\
	This Web Component can only do simple charts, and only supports a small subset of Chart.js's features.
- **Requires customisation**\
	It's probably better if you modify a copy of this script to support any further customisation such as styling, preferences, etc.

## Supported chart types:

- Line
- Multiple lines
- Dual Y-axis lines
- Bar
- Multiple bars
- Stacked bars

## Supported chart features

- Optional chart title
- Optional X-axis labels
- Dual Y-axes (Left and right) labels/scales
- Minimum and maximum Y-axis settings
- Linear scales
