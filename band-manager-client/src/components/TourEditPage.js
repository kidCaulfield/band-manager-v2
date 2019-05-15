import React, { useState, useEffect } from 'react';
import { Tour } from '../requests';

const TourEditPage = (props) => {
  let [tour, setTour] = useState(null);
  let [errors, setErrors] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const { currentTarget } = event;
    const formData = new FormData(currentTarget);

    update({
      tour: {
        title: formData.get("title"),
        band: formData.get("band")
      }
    })
  };

  const update = async (params) => {
    const response = await Tour.update(params, props.match.params.id);
    if (!response.error) {
      props.history.push(`/tour/${props.match.params.id}`);
      return response;
    } else {
      setErrors([response.error]);
    }
  }

  const getTour = async () => {
    const response = await Tour.one(props.match.params.id);
    setTour(response.tour)
  }

  const cancel = () => {
    props.history.push(`/tour/${props.match.params.id}`)
  }

  useEffect(() => {
    getTour();
    setErrors([]);
  }, [])

  if (!tour) {
    return (
    <div className="sk-circle">
      <div className="sk-circle1 sk-child"></div>
      <div className="sk-circle2 sk-child"></div>
      <div className="sk-circle3 sk-child"></div>
      <div className="sk-circle4 sk-child"></div>
      <div className="sk-circle5 sk-child"></div>
      <div className="sk-circle6 sk-child"></div>
      <div className="sk-circle7 sk-child"></div>
      <div className="sk-circle8 sk-child"></div>
      <div className="sk-circle9 sk-child"></div>
      <div className="sk-circle10 sk-child"></div>
      <div className="sk-circle11 sk-child"></div>
      <div className="sk-circle12 sk-child"></div>
    </div>
    );
  };

  return (
    <div className="TourEditPage">
      <div className="form-box">
        <h1 className="title blue">Edit Tour</h1>
        <form className="form" onSubmit={handleSubmit}>
          {errors.length > 0 && (
            <div className="FormErrors">
              {errors.map(error => <div className="red error" key={error}>{error}</div>)}
            </div>
          )}
          <div>
            <label className="label" htmlFor="title">Title</label><br/>
            <input className="input" type="text" name="title" defaultValue={tour.title}></input>
          </div>
          <div>
            <label className="label" htmlFor="band">Band</label><br/>
            <input className="input" type="text" name="band" defaultValue={tour.band}></input>
          </div>
          <input className="button" type="submit" value="Update" />
          <button className="Delete-button" onClick={cancel}>cancel</button>
        </form>
      </div>
    </div>
  );
};

export default TourEditPage;