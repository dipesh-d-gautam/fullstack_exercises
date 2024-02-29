import axios from "axios"
const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all"

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject)
  return request.then((response) => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then((response) => response.data)
}

const getWeatherData = (detail) => {
  const api_key = import.meta.env.VITE_SOME_KEY
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${detail.lat}&lon=${detail.lon}&appid=${api_key}&units=metric`
  const request = axios.get(url)
  return request.then((response) => response)
}

export default { getAll, create, update, getWeatherData }
