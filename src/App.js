import './App.css';
import { useState } from 'react';
import Search from './Components/Search';
import logo from "./Images/logo.png";
import CurrentWeather from "./Components/CurrentWeather.js";
import WeeklyForecast from './Components/WeeklyForecast';
import { WEATHER_API_URL, WEATHER_API_KEY } from './api';
import HalfMoon from "./Images/HalfMoon.png";
import Clock from './Components/Time.js';

function App() {

  const [currentWeather, setcurrentWeather] = useState(null);
  const [weeklyforecast, setweeklyForecast] = useState(null);
  const [loading, setLoading] = useState(true);



  const handleOnSearchChange = (searchData) => {
    setLoading(false);
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(`${WEATHER_API_URL}weather?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API_KEY}`);
    const weeklyforecastFetch = fetch(`${WEATHER_API_URL}forecast?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API_KEY}`);


    Promise.all([currentWeatherFetch, weeklyforecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setcurrentWeather({ city: searchData.label, ...weatherResponse });
        setweeklyForecast({ city: searchData.label, ...forecastResponse });

      })
      .catch((err) => console.log(err));
  }

  return (
    <section className='section01'>
      <div className="App">
        <div className='logo-clock'>
          <img className='image-logo' src={logo} alt='' height="120" width="120" />
          <div className='clock'>< Clock /></div>
        </div>
        <div>
          <Search onSearchChange={handleOnSearchChange} />
        </div>
        <div className='complete-forecast'>
          {loading ? (
            <div>
              <div className='img-div'>
                <img src={HalfMoon} alt='' height="300" width="300" />
              </div>
              <div className='para'>
                <p>Explore current weather data and 6-day forecast of more than 200,000 cities!</p>
              </div>
            </div>
          ) : (
            <div className='complete-forecast1'>
              {currentWeather && <CurrentWeather data={currentWeather} />}
              {weeklyforecast && <WeeklyForecast data={weeklyforecast} />}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default App;
