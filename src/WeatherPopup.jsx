import React from 'react';

const WeatherPopup = ({ weather, onClose }) => {
    return (
        <div className={`popup-overlay active`}>
            <div className={`popup-content active`}>
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Weather in {weather.name}</h2>
                <h3>Temperature: {Math.round(weather.main.temp)}&deg;C</h3>
                <h3>Condition: {weather.weather[0].main}</h3>
                <h3>Wind Type: {weather.wind.speed}</h3>
                <h3>Humidity: {weather.main.humidity}</h3>
            </div>
        </div>
    );
}

export default WeatherPopup;
