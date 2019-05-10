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
          <div className="ConfirmedTour" key={index}>
            <h2 className="blue fancy">{tour.title}</h2>
            <p className="Band"><strong>Band: </strong>{tour.band}</p>
          </div>
        ))
      }
    </div>
  )
};

export default TouringNetwork;