import React, { useState ,useEffect } from 'react';
import { Event } from '../requests';

const EventEditPage = (props) => {
  let [event, setEvent] = useState({});
  let [errors, setErrors] = useState([])

  const updateEvent = async (params) => {
    const updated = await Event.update(props.match.params.tourId, props.match.params.eventId, params);
    if (!updated.error) {
      props.history.push(`/tour/${props.match.params.tourId}`);
      return updated;
    } else {
      setErrors([updated.error]);
    };
  };

  const cancel = () => {
    props.history.push(`/tour/${props.match.params.tourId}`)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { currentTarget } = event;
    const formData = new FormData(currentTarget);

    updateEvent({
      event: {
        title: formData.get("title"),
        details: formData.get("details")
      }
    });
  };

  const getEvent = async () => {
    const response = await Event.edit(props.match.params.tourId, props.match.params.eventId);
    setEvent(response.event)
  };

  useEffect(() => {
    getEvent();
    setErrors([]);
  }, [])

  if (event.length === 0) {
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
    <div className="EventEditPage">
      <h1 className="title blue">Make an account</h1>
      <form className="form" onSubmit={handleSubmit}>
        {errors.length > 0 && (
          <div className="FormErrors">
            {errors.map(error => <div className="red error" key={error}>{error}</div>)}
          </div>
        )}
        <div>
          <label className="label" htmlFor="tile">Title</label><br/>
          <input className="input" defaultValue={event.title} type="text" name="title"></input>
        </div>
        <div>
          <label className="label" htmlFor="details">Details</label><br/>
          <textarea className="input-text" name="details" value={event.details}></textarea>
        </div>
        <input className="button" type="submit" value="Update" />
      </form>
      <button className="Delete-button" onClick={cancel}>cancel</button>
    </div>
  );
};

export default EventEditPage;