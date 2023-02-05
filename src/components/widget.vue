<template>
   <div class="widget-wrapper">
      <div v-if="!settings && componentLoaded">
         <header class="d-flex flex-row justify-content-between align-items-center mb-2">
            <div class="header-city">
               {{ weatherInfo.name }} {{ weatherInfo.sys?.country }}
            </div>
            <div class="header-settings" @click="setSettings()">
               <Icon icon="material-symbols:settings" />
            </div>
         </header>
         <div class="weather-icons">
            <img :src="getUrl" alt="">
            <span>{{ Math.floor(weatherInfo.main?.temp) }}</span>
            <Icon icon="ri:celsius-fill" width="40" />
         </div>
         <div class="weather-info w-100">
            <div class="general-info fs-5 d-flex flex-column">
               <span>Feels like: {{ weatherInfo.main?.feels_like }} C</span>
               <span>{{ weatherMainInfo.description?.toUpperCase() }}</span>
            </div>
            <div class="additional-info fs-7 align-items-center">
               <span>
                  <Icon icon="teenyicons:direction-outline" width="20" /> {{ weatherInfo.wind?.deg }} deg,
                  {{ weatherInfo.wind?.speed }}m/s
               </span>
               <span>Visibility: {{ weatherInfo.visibility }} m</span>
               <span>
                  <Icon class="icon" icon="mdi:car-brake-low-pressure" width="20" /> {{ weatherInfo.main?.pressure }}
                  hPa
               </span>
               <span>Humidity: {{ weatherInfo.main?.humidity }}%</span>
            </div>
         </div>
      </div>
      <Settings v-if="settings" @setSettings="setSettings" :cities="cities" :chosenCity="chosenCity" @addCity="addCity"
         @setChosenCity="setChosenCity" @deleteCity="deleteCity" />
      <Icon v-if="!componentLoaded" icon="eva:loader-outline" width="60" />
   </div>
</template>

<script>
import { Icon } from '@iconify/vue';
import Settings from './settings.vue';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import { getCoordinates, getWeatherInfo } from "../services/weatherAPI"

export default {
   data() {
      return {
         weatherInfo: {},
         weatherMainInfo: {},
         chosenCity: '',
         settings: false,
         cities: [],
         componentLoaded: false
      }
   },
   components: {
      Icon,
      Settings
   },
   methods: {
      async fetchWeatherData() {
         const ChosenCityCoordination = await getCoordinates(this.chosenCity)
         this.weatherInfo = await getWeatherInfo(ChosenCityCoordination)
         this.weatherMainInfo = await this.weatherInfo.weather[0]
         this.componentLoaded = true
      },
      async setCurrentCityInfo() {
         const success = async (position) => {
            const latitude = position.coords?.latitude;
            const longitude = position.coords?.longitude;
            this.weatherInfo = await getWeatherInfo({ lat: latitude, lon: longitude })
            this.weatherMainInfo = await this.weatherInfo.weather[0]

            if (!this.cities.includes(this.weatherInfo.name)) {
               this.cities.push(this.weatherInfo.name.toLowerCase())
            }
            localStorage.setItem('cities', JSON.stringify(this.cities))
            localStorage.setItem('chosenCity', JSON.stringify(this.weatherInfo.name.toLowerCase()))
         };

         const error = (err) => {
            console.log(err)
         };
         navigator.geolocation.getCurrentPosition(success, error);
         this.componentLoaded = true
      },
      setSettings() {
         this.settings = this.settings ? false : true
      },
      setCities() {
         this.cities = localStorage.getItem('cities') ? JSON.parse(localStorage.getItem("cities")) : []
      },
      setChosenCity(city) {
         this.chosenCity = city.toLowerCase()
         localStorage.setItem('chosenCity', JSON.stringify(this.chosenCity))
         this.fetchWeatherData()
      },
      addCity(cityName) {
         axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=10ecbab3e9aca4de70736689048eeee4`)
            .then(res => {
               if (!this.cities.includes(cityName.toLowerCase()) && res.data[0]) {
                  this.cities.push(cityName.toLowerCase())
                  localStorage.setItem('cities', JSON.stringify(this.cities))
               } else if (this.cities.includes(cityName.toLowerCase())) {
                  alert("This city is already in the list.")
               } else {
                  alert("There is no such city in the World. Sorry.")
               }
            })
      },
      deleteCity(cityName) {
         this.cities = this.cities.filter(city => city !== cityName)
         localStorage.setItem('cities', JSON.stringify(this.cities))
      },
   },
   mounted() {
      this.chosenCity = localStorage.getItem('chosenCity') ? JSON.parse(localStorage.getItem("chosenCity"))
         : this.setCurrentCityInfo()
      if (this.componentLoaded) {
         this.fetchWeatherData()
         this.setCities()
      }
   },
   computed: {
      getUrl() {
         return `http://openweathermap.org/img/wn/${this.weatherMainInfo.icon}@2x.png`
      },
   }
}
</script>

<style lang="css">
.widget-wrapper {
   width: 240px;
   height: 100%;
   min-height: 300px;
   margin: 10px;
   padding: 5px;
   border: 1px solid black;
   background-color: cornsilk;
   border-radius: 15px;
   display: flex;
   justify-content: center;
}

.header-settings {
   cursor: pointer;
}

.weather-icons {
   display: flex;
   align-items: center;
   font-size: xx-large;
   font-weight: 600;
}

.general-info {
   border: 1px solid black;
   border-radius: 10px;
   padding: 5px;
   background-color: white;
}

.additional-info {
   display: grid;
   grid-template-columns: 1fr 1fr;
   padding: 5px;
}

.additional-info span {
   display: flex;
   align-items: center;
   text-align: center;
   font-size: medium;
   border-bottom: 1px solid black;
}

.additional-info .icon {
   margin-right: 5px;
}
</style>