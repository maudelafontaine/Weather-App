import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

function App() {
  // save api object in state
  const [data, setData] = useState({});
  // when user types in input, the value become "location"
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=60ce5fed1ea4457afc30c27d324864d5`;

  /* When user press "Enter":
  1- GET url
  2- wait for response
  3- when you get response, save the data in a state
  4- set Location to "";
  */
  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((res) => {
        setData(res.data);
        console.log(res.data);
        // setLocation(res.data.city.name);
        setLocation("");
      });
    }
  };

  return (
    <div className="app">
      <div className="search">
        {/* <p style={{ fontSize: "30px", padding: "30px" }}>
          Welcome to Weather API
        </p> */}
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          type="text"
          placeholder={"Enter Location"}
          onKeyPress={searchLocation}
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p style={{ fontSize: "25px" }}>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? (
              <h1 style={{ fontSize: "50px" }}>{data.main.temp.toFixed()}°F</h1>
            ) : null}
          </div>
          <div className="description">
            {data.weather ? (
              <p style={{ fontSize: "24px" }}>{data.weather[0].main}</p>
            ) : null}
            {/* <p>clouds</p> */}
          </div>
        </div>

        {data.main !== undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <p className="bold">{data.main.feels_like.toFixed()}°F</p>
              ) : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? (
                <p className="bold">{data.wind.speed.toFixed()}MPH</p>
              ) : null}
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
