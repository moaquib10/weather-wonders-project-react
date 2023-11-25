import "./WeeklyForecast.css";
import { WiHumidity } from "react-icons/wi";
import { FaTemperatureEmpty } from "react-icons/fa6";
import { TbWind } from "react-icons/tb";
import { IoCloudSharp } from "react-icons/io5";

const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function WeeklyForecast({ data }) {
    if (!data) {
        return <div></div>;
    }

    const dayInWeek = new Date().getDay();
    const forecastDays = WEEK_DAYS.slice(dayInWeek).concat(WEEK_DAYS.slice(0, dayInWeek));

    return (
        <section className="wf-section">
            <div className="heading">
                <h5>WEEKLY FORECAST</h5>
            </div>
            <div className="weekly-container">
                {data.list.slice(1, 7).map((item, indx) => (
                    <div key={indx} className="weeklyforecast">
                        <div className="wf-weather">
                            <div className="wf-weather-day">{forecastDays[indx]}</div>
                            <div className="wf-weather-image">
                                <img className='wf-image' src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`} alt='' height="30" width="30" />
                                <div className="weather-image-info">{item.weather[0].description}</div>
                            </div>
                        </div>
                        <div className="wf-weather">
                            <div className="wf-weatherimage-data">
                                <FaTemperatureEmpty size={20} color="grey" />
                                <div className="wf-weather-temp">{`${item.main.temp}°C`}</div>
                            </div>
                            <div className="wf-weatherimage-data">
                                <IoCloudSharp size={20} color="grey" />
                                <div className="wf-weather-temp">{`${item.clouds.all}%`}</div>
                            </div>
                        </div>
                        <div className="wf-weather">
                            <div className="wf-weatherimage-data">
                                <TbWind size={20} color="grey" />
                                <div className="wf-weather-temp">{`${item.wind.speed} m/s`}</div>
                            </div>
                            <div className="wf-weatherimage-data">
                                <WiHumidity size={20} color="grey" />
                                <div className="wf-weather-temp">{`${item.main.humidity}%`}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
