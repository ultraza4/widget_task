import { defineCustomElement, createApp, h } from 'vue';
import wrapper from "vue3-webcomponent-wrapper";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.js"
import WeatherWidget from './components/widget.vue'

const vueElement = wrapper(WeatherWidget,createApp, h);

customElements.define('weather-widget', vueElement);
