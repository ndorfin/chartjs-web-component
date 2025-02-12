const URL_CHARTJS = 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.min.js';
const SCRIPT_ID = 'chart-js';
const MODULE_MAP = {
	bar: [
		BarController,
		BarElement,
		CategoryScale,
		LinearScale,
	],
	bubble: [
		BubbleController,
		PointElement,
		LinearScale,
	],
	doughnut: [
		DoughnutController,
		ArcElement,
	],
	line: [
		LineController,
		LineElement,
		PointElement,
		CategoryScale,
		LinearScale,
	],
	pie: [
		PieController,
		ArcElement,
	],
	polararea: [
		PolarAreaController,
		ArcElement,
		RadialLinearScale,
	],
	radar: [
		RadarController,
		LineElement,
		PointElement,
		RadialLinearScale,
	],
	scatter: [
		ScatterController,
		PointElement,
		LinearScale,
	]
}

export default class WCChart extends HTMLElement {

	chart = null;
	canvas = null;

	#installDependencies() {
		let script = document.createElement('script');
		script.id = SCRIPT_ID;
		script.src = URL_CHARTJS;
		script.defer = true;
		script.onload = this.#invoke;
		document.head.append(script);
	}

	#bootup() {
		if (!window.Chart) {
			this.#installDependencies();
		} else {
			this.#invoke();
		}
	}

	#invoke() {
		(async () => {
			await import(URL_CHARTJS)
				.then((returnObj) => {
					console.log(returnObj);
					window.Chart.register(LineController, LineElement, PointElement, CategoryScale, LinearScale);

					this.canvas = document.createElement('canvas');
					this.appendChild(canvas);
				});
		})();
	}

	#render() {
		this.chart = new window.Chart(this.canvas.getContext('2d'), this.data);
	}

  attributeChangedCallback() {
    this.#render()
  }

	connectedCallback() {
		this.#bootup();
	}

	get data() {
		return this.getAttribute('data');
	}

	static get observedAttributes() {
    return ['data'];
  }
}
