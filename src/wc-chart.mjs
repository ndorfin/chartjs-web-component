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
					datasets: [{
						label: this.label,
						data: this.data
					}],
					labels: this.data,
				}
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
		return JSON.parse(this.getAttribute('data'));
	}

	get label() {
		return this.getAttribute('label');
	}

	get type() {
		return this.getAttribute('type');
	}
}

window.customElements.define('wc-chart', WCChart);
