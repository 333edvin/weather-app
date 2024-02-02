import './App.css';
import React, { useState } from 'react';
import sunny from './Assets/sunny.jpg';
import cloudy from './Assets/cloudy.jpg';
import rainy from './Assets/rain.jpg';
import thunder from './Assets/thunder.jpg';
import snow from './Assets/snow.jpg';
import mist from './Assets/mist.jpg';
//icons
import sunicon from './Assets/icons/sun.png';
import cloudyicon from './Assets/icons/cloudy.png';
import rainyicon from './Assets/icons/rainy.png';
import thundericon from './Assets/icons/thunder.png';
import snowicon from './Assets/icons/snow.png';
import misticon from './Assets/icons/mist.png';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(sunny);
  const [icon,setIcon] = useState(null)
  const apiKey = "b9462637f3156d93e7c9f74f8e273f17";

  const search = async () => {
      const cityInput = document.querySelector(".cityInput");
      const city = cityInput.value.trim();

      if (!city) {
          toast.info("Search input is empty",{position: "top-center"})
          return;
      }

      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

      try {
          const response = await fetch(url);
          const jsonData = await response.json();

          if (response.ok) {
              setWeatherData(jsonData);
              updateBackground(jsonData.weather[0].icon);
          } else {
              toast.warning("Place not found. Please enter a valid name.");
          }
      } catch (error) {
          console.error("Error fetching data:", error);
          toast.error("Error fetching data. Please try again later.");
      }
  };

  const updateBackground = (weatherIcon) => {
    const body = document.body;
  body.classList.add('fade-in-out');
      switch (weatherIcon) {
        case '01d':
            case '01n':
                setBackgroundImage(sunny);
                setIcon(sunicon)
                break;
            case '02d':
            case '02n':
                setBackgroundImage(cloudy);
                setIcon(cloudyicon)
                break;
            case '03d':
            case '03n':
            case '04d':
            case '04n':
                setBackgroundImage(cloudy);
                setIcon(cloudyicon)
                break;
            case '09d':
            case '09n':
            case '10d':
            case '10n':
                setBackgroundImage(rainy);
                setIcon(rainyicon)
                break;
            case '11d':
            case '11n':
                setBackgroundImage(thunder);
                setIcon(thundericon)
                break;
            case '13d':
            case '13n':
                setBackgroundImage(snow);
                setIcon(snowicon)
                break;
            case '50d':
            case '50n':
                setBackgroundImage(mist);
                setIcon(misticon)
                break;
            default:
                setBackgroundImage(sunny);
                break;
      }
      setTimeout(() => {
        body.classList.remove('fade-in-out');
      }, 500);
  };
  return (
    <div className="App ">
 <div className='container-fluid text-center  d-flex justify-content-center p-3 ' style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center',width:"100%" ,height:"100vh"}}>

  <div className='card  mt-4'>

            <div className='top-bar d-flex gap-2 justify-content-center'>
{/* 
                <input type="text" className='cityInput p-2 border rounded-4' placeholder='search here...' />
                <button onClick={search} className='btn rounded-4'>  </button> */}

                <InputGroup className='w-75'>
        <Form.Control
          placeholder="Search here.."
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          className=" cityInput p-2   "
        />
        <Button variant="dark" id="button-addon2" onClick={search}> 
        <i className='fa-solid fa-search text-white px-1'></i>
        </Button>
      </InputGroup>

            </div>
            {weatherData ? (
                <div className="weather-info text-white text-center">
                    <div className='temp-card py-5  my-2'>

                    <p className='temp-content'>{weatherData.name}, {weatherData.sys.country}</p>
                    <p className='temp'>{Math.round(weatherData.main.temp)}°C</p>
                    <p className='temp-content'>Feels Like : {Math.round(weatherData.main.feels_like)}°C</p>
                    </div>

                    <div className='row gap-2 justify-content-between'>
<div className='col rounded pt-3 d-flex flex-column align-items-center justify-content-center' >

                    <p className='fs-6'>Description : <br/> {weatherData.weather[0].description} <img src={icon} alt="Weather Icon" style={{width:"30px"}} /></p>
                    <p className='fs-6'>Main Weather :<br/> {weatherData.weather[0].main}  <img src={icon} alt="Weather Icon" style={{width:"30px"}} /></p>
</div>
<div className='col rounded pt-3 d-flex flex-column align-items-center justify-content-center'>

                    <p>Humidity <i className='fa-solid fa-droplet'></i>
                    <br/> {weatherData.main.humidity}% <i className='fa-solid fa-sky'></i></p>
                    <p>Wind Speed <i className='fa-solid fa-wind'></i> <br/> {weatherData.wind.speed} m/s </p>
                    </div>
                </div>
                </div>
            ) : (
                <>
              <p className='p-2 mb-5 fw-bold  text-white starting-page'>Welcome to Weather App</p>
                <div className='d-flex flex-column gap-5 p-3 text-white icons-page' style={{fontSize:"50px"}}>
                    <div className='d-flex justify-content-around'>

             <img src={sunicon} alt='sun'/>
             <img src={cloudyicon} alt='sun'/>
             <img src={rainyicon} alt='sun'/>
             </div>
             <div className='d-flex justify-content-around'>

             <img src={thundericon} alt='sun'/>
             <img src={snowicon} alt='sun'/>
             <img src={misticon} alt='sun'/>
                    </div>
             
                </div>
                </>
              )}
        </div>
    </div>

    <ToastContainer position="top-center"/>
              </div>
);
}

export default App;
