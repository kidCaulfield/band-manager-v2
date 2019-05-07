import React, { useEffect } from 'react';
import { Event } from '../requests';

import { getEvent } from '../actions/eventActions';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

const EventEditPage = (props) => {

  const updateEvent = async (params) => {
    const updated = await Event.update(props.match.params.tourId, props.match.params.eventId, params);
    props.history.push(`/tour/${props.match.params.tourId}`)
    return updated
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { currentTarget } = event;
    const formData = new FormData(currentTarget);

    updateEvent({
      event: {
        name: formData.get("name"),
        details: formData.get("details"),
      }
    })
  }

  useEffect(() => {
    props.onGetEvent(props.match.params.tourId, props.match.params.eventId)
  }, [])

  return (
    <div className="EventEditPage">
      <h1 className="title blue">Make an account</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <label className="label" htmlFor="name">Title</label><br/>
          <input className="input" defaultValue={props.event.name} type="text" name="name"></input>
        </div>
        <div>
          <label className="label" htmlFor="details">Details</label><br/>
          <textarea className="input-text" defaultValue={props.event.details} name="details"></textarea>
        </div>
        <input className="button" type="submit" value="Update" />
      </form>
    </div>
  );
};

const eventSelector = createSelector(
  state => state.event,
  event => event
)

const mapStateToProps = createSelector(
  eventSelector,
  (event) => ({
    event
  })
);

const mapDispatchtoProps = {
  onGetEvent: getEvent
}

export default connect(mapStateToProps, mapDispatchtoProps)(EventEditPage);