import "./CurrentWeather.css";
import { WiHumidity } from "react-icons/wi";
import { FaTemperatureEmpty } from "react-icons/fa6";
import { TbWind } from "react-icons/tb";
import { IoCloudSharp } from "react-icons/io5";



export default function CurrentWeather({ data }) {
  if (!data) {
    return <div></div>
  }
  return (
    <section className="cw-section">
      <div>
        <div className='heading'>
          <h5>CURRENT WEATHER</h5>
        </div>
        <div className='current-data'>
          <div className='city-name'>{data.city}</div>
          <div className='weather-data'>
            <div className='current-temp'>{Math.round(data.main.temp)}°C</div>
            <div className='current-temp1'>{data.weather[0].description}</div>
          </div>
          <div className='presentday-weather-image'>
            <img className='cw-image' src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`} alt='' height="70" width="70"></img>
          </div>
        </div>
      </div>

      <div className="cw-ac-section">
        <div className='heading'>
          <h5>AIR CONDITIONS</h5>
        </div>
        <div className="current-data1">
          <div className="current-wd">
            <div className="current-wd1">
              <FaTemperatureEmpty size={20} color="grey" />
              <span className="icon-name">Real Feel</span>
            </div>
            <div className="current-wd2">{Math.round(data.main.feels_like)}°C</div>
          </div>
          <div className="current-wd">
            <div className="current-wd1">
              <TbWind size={20} color="grey" />
              <span className="icon-name">Wind</span>
            </div>
            <div className="current-wd2">{data.wind.speed} m/s</div>
          </div>
          <div className="current-wd">
            <div className="current-wd1">
              <IoCloudSharp size={20} color="grey" />
              <span className="icon-name">Clouds</span>
            </div>
            <div className="current-wd2">{data.clouds.all} %</div>
          </div>
          <div className="current-wd">
            <div className="current-wd1">
              <WiHumidity size={20} color="grey" />
              <span className="icon-name">Humidity</span>
            </div>
            <div className="current-wd2">{data.main.humidity}%</div>
          </div>
        </div>
      </div>
    </section>
  );
};