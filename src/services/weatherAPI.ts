import axios from 'axios'
import { WeatherInfoType } from '../types/weatherInfoTypes'
import { getCoordinatesType } from "../types/getCoordinatesType"

export const getCoordinates = async (cityName: string): Promise<getCoordinatesType> => {
   try {
      const response = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=10ecbab3e9aca4de70736689048eeee4`)
      return response.data[0]
   } catch (error) {
      console.log(error)
      throw(error)
   }
   
}

export const getWeatherInfo = async (ChosenCityCoordination : {lat: number, lon: number}): Promise<WeatherInfoType> => {
   try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${ChosenCityCoordination.lat}&lon=${ChosenCityCoordination.lon}&appid=10ecbab3e9aca4de70736689048eeee4&units=metric`)
      return response.data
   } catch (error) {
      console.log(error)
      throw(error)
   }
   
}
export const isCityExist = async(cityName: string): Promise<boolean> => {
   try {
      const response = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=10ecbab3e9aca4de70736689048eeee4`)
      return response.data[0] ? true : false
   } catch (error) {
      console.log(error)
      throw(error)
   }
}