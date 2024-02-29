import { useState, useEffect } from "react"
import countriesService from "./services/Countries"
import CountryDetail from "./components/CountryDetail"
import "./App.css"

const App = () => {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [tooManyCountriesFound, setTooManyCountries] = useState([""])
  const [countryDetail, setCountryDetail] = useState({})

  useEffect(() => {
    countriesService.getAll().then((countries) => {
      setCountries(countries)
    })
  }, [])

  const handleInputChange = (event) => {
    if (event.target.value === "") {
      setTooManyCountries("")
      setFilteredCountries([])
      return
    }
    const pattern = new RegExp(event.target.value, "gi")
    const filteredCountries = countries.filter((country) => {
      const filteredCountry = pattern.test(country.name.common)
      return filteredCountry
    })
    if (filteredCountries.length > 10) {
      setFilteredCountries([])
      setCountryDetail({})
      setTooManyCountries("Too many matches, specify another filter")
    } else {
      setTooManyCountries("")
      setCountryDetail({})
      setFilteredCountries(filteredCountries)
    }
    if (filteredCountries.length === 1) {
      handleCountryDetail(filteredCountries[0])
    }
  }

  const handleCountryDetail = (country) => {
    const countryDetail = {
      name: country.name.common,
      area: country.area,
      capital: country.capital[0],
      languages: country.languages,
      flag: country.flags.svg,
    }
    countriesService
      .getWeatherData({
        lat: country.latlng[0],
        lon: country.latlng[1],
      })
      .then((response) => {
        if (response.status === 200) {
          countryDetail.weather = response.data
          setCountryDetail(countryDetail)
          // setWeather(response.data)
        }
      })
      .catch((error) => error)
  }

  return (
    <div className="container">
      <span style={{ marginRight: "5px" }}>find countries</span>
      <input type="text" onChange={handleInputChange} />
      {filteredCountries.length > 1 && (
        <ul className="allCountries">
          {filteredCountries.map((country, index) => (
            <li key={index}>
              {country.name.common}{" "}
              <CountryDetail
                showCountryDetail={() => handleCountryDetail(country)}
              />
            </li>
          ))}
        </ul>
      )}
      {Object.keys(countryDetail).length > 0 && (
        <div>
          <p className="country">{countryDetail.name}</p>
          <p>capital {countryDetail.capital}</p>
          <p>area {countryDetail.area}</p>
          <ul className="language">
            <p>languages: </p>
            {Object.keys(countryDetail?.languages).map((language, index) => (
              <li key={index}>
                <span>{countryDetail.languages[language]}</span>
              </li>
            ))}
          </ul>
          <div>
            <img className="flagContainer" src={countryDetail.flag} />
            <p className="weather">Weather in {countryDetail.capital}</p>
            {Object.keys(countryDetail?.weather) && (
              <div>
                <p>temperature {countryDetail.weather.main.temp}</p>
                <img
                  src={`https://openweathermap.org/img/wn/${countryDetail.weather.weather[0].icon}@2x.png`}
                />
                <p>wind {countryDetail.weather.wind.speed} m/s</p>
              </div>
            )}
          </div>
        </div>
      )}
      {setTooManyCountries !== "" && <p>{tooManyCountriesFound}</p>}
    </div>
  )
}

export default App
