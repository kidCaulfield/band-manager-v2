import React, { useState ,useEffect } from 'react';
import { Event } from '../requests';

const EventEditPage = (props) => {
  let [event, setEvent] = useState({})
  console.log('event: ', event);

  const updateEvent = async (params) => {
    const updated = await Event.update(props.match.params.tourId, props.match.params.eventId, params);
    props.history.push(`/tour/${props.match.params.tourId}`);
    return updated;
  }

  const cancel = () => {
    props.history.push(`/tour/${props.match.params.tourId}`)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { currentTarget } = event;
    const formData = new FormData(currentTarget);

    updateEvent({
      event: {
        name: formData.get("name"),
        details: formData.get("details")
      }
    });
  };

  const getEvent = async () => {
    const response = await Event.edit(props.match.params.tourId, props.match.params.eventId);
    setEvent(response.event)
  };

  useEffect(() => {
    getEvent()
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

  console.log('event.details: ', event.details);
  return (
    <div className="EventEditPage">
      <h1 className="title blue">Make an account</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <label className="label" htmlFor="name">Title</label><br/>
          <input className="input" defaultValue={event.name} type="text" name="name"></input>
        </div>
        <div>
          <label className="label" htmlFor="details">Details</label><br/>
          <textarea className="input-text" name="details" defaultValue={event.details}></textarea>
        </div>
        <input className="button" type="submit" value="Update" />
      </form>
      <button className="Delete-button" onClick={cancel}>cancel</button>
    </div>
  );
};


export default EventEditPage;