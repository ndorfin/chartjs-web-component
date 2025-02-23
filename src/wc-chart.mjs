const URL_CHARTJS = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.7/dist/chart.umd.min.js';

export default class WCChart extends HTMLElement {

	chart = null;
	canvas = null;

	#bind() {
		this.chart = new window.Chart(
			this.canvas,
			{
				type: this.type,
				data: {
					datasets: this.data,
					labels: this.labels,
				},
			}
		);
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

	get data() {
		return Array.from(this.querySelectorAll('[slot="data"]')).map((item) => {
			return {
				label: item.getAttribute('data-label'),
				data: JSON.parse(item.innerHTML),
			};
		});
	}

	get labels() {
		let labelAttr = this.getAttribute('labels');
		if (labelAttr) return labelAttr.split(',');

		let labelJSON = this.querySelector('[slot="labels"]');
		if (labelJSON) return JSON.parse(labelJSON.innerHTML);

		let emptyArray = new Array(this.data[0].data.length).fill('')
		return emptyArray;
	}

	get label() {
		return this.getAttribute('label');
	}

	get type() {
		return this.getAttribute('type');
	}
}

window.customElements.define('wc-chart', WCChart);
