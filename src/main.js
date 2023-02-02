import { defineCustomElement } from 'vue';
import WeatherWidget from './components/widget.vue'

const vueElement = defineCustomElement(WeatherWidget);

customElements.define('weather-widget', vueElement);
