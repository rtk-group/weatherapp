import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import clear from './assets/clear.png'
import cloudy from './assets/cloudy.webp'
import drizzle from './assets/drizzle.png'
import haze from './assets/haze.png'
import snow from './assets/snow.png'
import wind from './assets/wind.png'
import rainy from './assets/rainy.webp'

function Weather() {
  var inputref = useRef();

  let weathericons = {
    "01d": clear,
    "01n": clear,
    "02d": cloudy,
    "02n": cloudy,
    "04d": cloudy,
    "04n": cloudy,
    "50d": haze,
    "50n": haze,
    "09d": drizzle,
    "09n": drizzle,
    "10d": rainy,
    "10n": rainy,
    "11d": wind,
    "11n": wind,
    "13d": snow,
    "13n": snow,
  };

  const [weatherdata, setweatherdata] = useState(false);
  const [cityname, setcityname] = useState('delhi');

  const search = async (city) => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7b9fc4d8a28bb851dc2db3346a2d7fd9`;
      let response = await fetch(url);
      let data = await response.json();
      // console.log(data);

      const icon = weathericons[data.weather[0].icon] || clear;
      setweatherdata({
        temperature: Math.trunc(data.main.temp - 273),
        humidity: data.main.humidity,
        visibility: data.visibility,
        windspeed: data.wind.speed,
        environment: data.weather[0].main,
        country: data.sys.country,
        location: data.name,
        icon: icon
      })
    } catch (error) {
      console.log(`this is 404 found ${error}`);
    }
  }
  const hello = () => {
    if (inputref.current.value === "") {
      alert('Sorry please Enter City name')
    } else {
      setcityname(inputref.current.value);
      inputref.current.value = ""
    };
  }
  useEffect(() => {
    search(cityname);
  }, [cityname]);

  return (
    <>
      <div className="main">
        <div className="main-sec">
          <h1 className='showtemp'>{weatherdata.temperature} <sup>o</sup>C</h1>
          <div className="sec-2">
            <h1>Weather</h1>
            <div className="symbol">
              <span><img src={weatherdata.icon} alt="" /></span>
              <h1>{weatherdata.environment}</h1>
            </div>
            <div className="search">
              <input ref={inputref} type="text" className="inpt" placeholder="Search City" id='inptfld'></input>
              <span onClick={hello}><i className="fa-solid fa-magnifying-glass-location"></i></span>
            </div>
            <div className="ans"><h3>{weatherdata.location}, {weatherdata.country}</h3></div>
            <div className="temperature">
              <p>Temperature</p>
              <h3>{weatherdata.temperature} <sup>o</sup>C</h3>
            </div>
            <div className="humidity">
              <p>Humidity</p>
              <h3>{weatherdata.humidity} %</h3>
            </div>
            <div className="visibility">
              <p>Visibility</p>
              <h3>{weatherdata.visibility}</h3>
            </div>
            <div className="wind">
              <p>Wind Speed</p>
              <h3>{weatherdata.windspeed} K/h</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Weather;
