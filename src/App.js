import React, { useState, useEffect } from 'react';
import User from './User';

import './index.css';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loading1, setLoading1] = useState(true);
  const [limit, setLimit] = useState(10);
  

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=${limit}`);
        const jsonData = await response.json();
        setData(jsonData.results);
        console.log(jsonData.results);
        setLoading(false);
        setLoading1(false);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    }
    fetchData();
  }, [limit]);

  const handleScroll = () => {
    // console.log("Height:", document.documentElement.scrollHeight);
    // console.log("Top:", document.documentElement.scrollTop);
    // console.log("Windows Height:", window.innerHeight);
    if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
      setLoading1(true);
      setLimit(prev => prev + 10);
    }

  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <div className='head'><h1>Country Data</h1></div>
      {loading ? (
        <h2>Loading...</h2>
      ) : (<div>
        <table>
          <thead>
            <tr>
            
              <th>City Name</th>
              <th>Country</th>
              <th>Countyry Code</th>
              <th>TimeZone</th>
              <th>Population</th>
            
            </tr>
          </thead>
          <tbody>
            <User data={data} />
          </tbody>
        </table>
        {loading1 && <h2>Loading...</h2>}
        
      </div>
      )}

    </div>
  );
}

export default App;
