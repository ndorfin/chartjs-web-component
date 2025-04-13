const URL_CHARTJS = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.7/dist/chart.umd.min.js';

export default class WCChart extends HTMLElement {

	chart = null;
	canvas = null;

	#bind() {
		let chartConfig = {
			type: this.type === 'stacked-bar' ? 'bar' : this.type,
			data: {
				datasets: this.yData,
				labels: this.xLabels,
			},
			options: {
				plugins: {
					legend: {
						labels: {
							boxWidth: 10,
							boxHeight: 1,
						},
						title: {
							fontColor: '#13599f',
							text: this.chartLabel,
							display: !!this.chartLabel,
						},
					},
				},
				interaction: {
					mode: 'index',
					intersect: false,
				},
				scales: {
					x: {
						stacked: this.type === 'stacked-bar',
					},
					yLeft: {
						type: 'linear',
						position: 'left',
						min: this.min,
						max: this.max,
						stacked: this.type === 'stacked-bar',
					},
				}
			},
		}
		if (this.hasRightYAxis) {
			chartConfig.options.scales.yRight = {
				type: 'linear',
				position: 'right',
				grid: {
					drawOnChartArea: false,
				},
			}
		}
		this.chart = new window.Chart(this.canvas, chartConfig);
	}

	#invoke() {
		this.canvas = document.createElement('canvas');
		this.append(this.canvas);
		this.#bind();
	}

	async #import() {
		await import(URL_CHARTJS).then(() => {
			this.#invoke();
		});
	}

	connectedCallback() {
		(window.Chart) ? this.#invoke() : this.#import();
	}

	get yData() {
		return Array.from(this.querySelectorAll('[data-axis="y"]')).map((item) => {
			return {
				label: item.getAttribute('data-label'),
				data: JSON.parse(item.innerHTML),
				yAxisID: item.getAttribute('data-position') === 'right' ? 'yRight' : 'yLeft',
			};
		});
	}

	get xLabels() {
		if (this.xAxis) return this.xAxis;

		let longestArrayCount = 0;
		this.yData.forEach(dataset => {
			if (dataset.data.length > longestArrayCount) longestArrayCount = dataset.data.length;
		});

		let placeholderArray = new Array(longestArrayCount).fill('')
		return placeholderArray;
	}

	get xAxis() {
		let labelAttr = this.getAttribute('x-axis');
		if (labelAttr) return labelAttr.split(',');

		let labelJSON = this.querySelector('[data-axis="x"]');
		if (labelJSON) return JSON.parse(labelJSON.innerHTML);

		return null;
	}

	get chartLabel() {
		return this.getAttribute('label') || null;
	}

	get type() {
		return this.getAttribute('type');
	}

	get min() {
		return (this.hasAttribute('min')) ? parseFloat(this.getAttribute('min')) : null;
	}

	get max() {
		return (this.hasAttribute('max')) ? parseFloat(this.getAttribute('max')) : null;
	}

	get hasRightYAxis() {
		return this.querySelector('[data-axis="y"][data-position="right"]');
	}
}

window.customElements.define('wc-chart', WCChart);
