import React, { useState } from 'react';
import WeatherPopup from './WeatherPopup';

const User = ({ data }) => {
    const [weather, setWeather] = useState({});
    const [selectedCity, setSelectedCity] = useState(null);  
    const [showPopup, setShowPopup] = useState(false); 

    const weatherApi = {
        key: "bab281d79e5f1e9755a68d754cc313e7",
        baseUrl: "https://api.openweathermap.org/data/2.5/weather",
    }

    const handleClick = async (city) => {
        try {
            const response = await fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`);
            const jsonData = await response.json();
            console.log(jsonData);
            setWeather(() => ({[city]: jsonData}));
            setSelectedCity(city);
            setShowPopup(true);
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    }

    const closePopup = () => {
        setShowPopup(false);
    }

    return (
        <>
            {data.map((curUser, index) => (
                <tr key={index}>
                    <td>
                        <button onClick={() => handleClick(curUser.ascii_name)}>
                            {curUser.ascii_name}
                        </button>
                    </td>
                    <td>{curUser.cou_name_en}</td>
                    <td>{curUser.country_code}</td>
                    <td>{curUser.timezone}</td>
                    <td>{curUser.population}</td>
                </tr>
            ))}
            {showPopup && selectedCity && ( 
                <WeatherPopup
                    weather={weather[selectedCity]}
                    onClose={closePopup}
                />
            )}
        </>
    );
}

export default User;
