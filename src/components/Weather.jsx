import React, { useEffect, useState } from 'react'
import search from '../assets/search.png'
import sun from '../assets/sun.png'
import humidity from '../assets/humid.png'
import windspeed from '../assets/windspeed.png'

const Weather = () => {

  const [weatherData, setWeatherData] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  const getData = async (city)=>{
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`)
      const data = await response.json()
      console.log(data)
      setWeatherData({
        name: data.name,
        temperature: data.main.temp,
        humidity: data.main.humidity,
        icon: data.weather[0].icon,
        windSpeed: data.wind.speed,
      })
    } catch (error) {
      console.log(error)
      alert('try another city name...')
    }
  }

  useEffect(()=>{
    getData('london')
  },[])

  const handleSearch = ()=>{
    if(searchQuery.trim()!=='')
      getData(searchQuery.trim().toLowerCase())
  }
  return (
    <div className="weatherPage bg-indigo-300 min-h-screen flex justify-center items-center">
      <div className="weatherCard bg-indigo-700 h-[450px] flex-col justify-items-center w-[350px] rounded-xl p-7">
        <div className="input flex gap-5 justify-center">
          <input type="text" className='searchInput outline-0 bg-indigo-100 px-3 py-3 rounded-3xl text-indigo-600' placeholder='Search any city...' onChange={(e)=>setSearchQuery(e.target.value)} value={searchQuery} />
          <button className='searchBtn cursor-pointer bg-indigo-100 px-3 py-3 rounded-3xl' onClick={handleSearch}><img src={search} height='25px' width='25px' alt="" /></button>
        </div>
        <div className="mainInfo  w-[100%] flex-col  justify-items-center  p-5">
          <img src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`} alt="sunny" className='mainImg h-[100px]' />
          <h1 className='text-indigo-100 text-6xl mt-4'>{Math.floor(weatherData.temperature)}°C</h1>
          <h2 className='mainName text-4xl text-indigo-100 mt-3'>{weatherData.name}</h2>
        </div>
        <div className="moreDet  h-[80px] w-[100%] flex">
          <div className="humidity  h-[100%] w-[50%] flex items-center gap-3">
            <img src={humidity} alt="" className='h-8' />
            <div className="info">
              <h3 className='text-white text-xl'>{weatherData.humidity} %</h3>
              <p className='text-white text-md'>Humidity</p>
            </div>
          </div>
          <div className="windSpeed  h-[100%] w-[50%] flex items-center gap-3">
            <img src={windspeed} alt="" className='h-8' />
            <div className="info">
              <h3 className='text-white text-xl'>{weatherData.windSpeed} Km/h</h3>
              <p className='text-white text-md'>Wind Speed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Weather