import React, {useState, useEffect} from 'react';

import axios from "axios";
import NavBar from '../NavBar/NavBar'

const Main = (props) => {

    const api = {
        key: "0706c4346ca9edfcd261838ded79fd6c",
        base: "https://api.openweathermap.org/data/2.5/"
      }
  
      const [query, setQuery] = useState('');
      const [weather, setWeather] = useState({});
    
      const search = evt => {
        if (evt.key === "Enter") {
          fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
            .then(res => res.json())
            .then(result => {
              setWeather(result);
              setQuery('');
              console.log(result);
            });
        }
      }
      const dates = (d) => {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();
    
        return `${day}, ${month} ${date}th ${year}`
      }
    


    return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app-warm' : 'app') : 'app'}>
      <NavBar />
      <main>     
        <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="Search Location..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div className="info" >
          <div >
            <div >{weather.name}, {weather.sys.country}</div>
            <div >{dates(new Date())}</div>
          </div>
          <div >
            <div >
              {Math.round(weather.main.temp)}°c
            </div>
            <div> {weather.weather[0].main}</div>
          </div>
        </div>
        ) : ('')}
      </main>
    </div>
    )
}

export default Main