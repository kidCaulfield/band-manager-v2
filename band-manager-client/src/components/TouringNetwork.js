import React, { useState, useEffect } from 'react';
import { Tour } from '../requests'

const TouringNetwork = (props) => {
  let [tours, setTours] = useState([])

  const getConfirmedTours = async () => {
    const response = await Tour.allConfirmed();
    setTours(response.tours)
  }

  useEffect(() => {
    getConfirmedTours();
  }, [])

  return (
    <div className="TouringNetwork">
      <h1 className="blue">Users Touring</h1>
      {
        tours.map((tour, index) => (
          <div className="ConfirmedTour thin-underline" key={index}>
            <h2 className="blue">{tour.title}</h2>
          </div>
        ))
      }
    </div>
  )
};

export default TouringNetwork;