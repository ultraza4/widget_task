<template>
   <div class="widget-wrapper">
      <div v-if="!settings">
         <header class="d-flex flex-row justify-content-between align-items-center">
            <div class="header-city">
               {{ weatherMainInfo.name }} {{ weatherMainInfo.sys?.country }}
            </div>
            <div class="header-settings" @click="setSettings()">
               <Icon icon="material-symbols:settings" />
            </div>
         </header>
         <div class="weather-icons">

         </div>
         <div class="weather-info w-100">
            <div class="general-info fs-5">
               Feels like -3.Broken Clouds. Light breeze
            </div>
            <div class="additional-info fs-7">
               <span>{{}}</span>
               <span>Pressure</span>
               <span>Humidity</span>
               <span>Dew point</span>
               <span>Visinbility</span>
            </div>
         </div>
      </div>
      <Settings 
         v-if="settings" 
         @setSettings="setSettings" 
         :cities="cities" 
         @addCity="addCity"/>
   </div>
</template>

<script>
import { Icon } from '@iconify/vue';
import Settings from './settings.vue'
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios'

export default {
   data() {
      return {
         weatherMainInfo: {},
         ChosentCity: '',
         CurrentCoordination: {},
         settings: false,
         cities: []
      }
   },
   components: {
      Icon,
      Settings
   },
   methods: {
      async fetchWeatherData() {
         try {
            const coordinatesRes = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${this.ChosentCity}&limit=5&appid=10ecbab3e9aca4de70736689048eeee4`)
            const ChosenCityCoordination = coordinatesRes.data[0]

            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${ChosenCityCoordination.lat}&lon=${ChosenCityCoordination.lon}&appid=10ecbab3e9aca4de70736689048eeee4`)
            this.weatherMainInfo = response.data
            console.log(this.weatherMainInfo)
         } catch (error) {
            console.log(error)
         }

      },
      setSettings() {
         this.settings = this.settings ? false : true
      },
      setCities() {
         this.cities = localStorage.getItem('cities') ? JSON.parse(localStorage.getItem("cities")) : []
      },
      addCity(cityName){
         this.cities.push(cityName)
         localStorage.setItem('cities', JSON.stringify(this.cities))
      },
      setCurrentCityInfo() {
         const success = async (position) => {
            const latitude = position.coords?.latitude;
            const longitude = position.coords?.longitude;
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=10ecbab3e9aca4de70736689048eeee4`)
            this.weatherMainInfo = response.data
            
            if(!this.cities.includes(response.data.name)) this.cities.push(response.data.name)
            localStorage.setItem('cities', JSON.stringify(this.cities))
         };

         const error = (err) => {
            console.log(error)
         };
         navigator.geolocation.getCurrentPosition(success, error);
      }
   },
   mounted() {
      this.setCurrentCityInfo()
      this.setCities()
   }
}
</script>

<style lang="css">
.widget-wrapper {
   width: 200px;
   height: 400px;
   margin: 10px;
}

.header-settings {
   cursor: pointer;
}

.additional-info {
   display: grid;
   grid-template-columns: 1fr 1fr;
}
</style>