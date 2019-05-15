import React, {useState, useEffect} from 'react'
import { Google, Venue } from '../requests';

import { connect } from 'react-redux';
import { createEvent } from '../actions/eventsActions';
import { createSelector } from 'reselect';

const EventsNewPage = (props) => {
  let [errors, setErrors] = useState([])

  const createEventOnSubmit = (params) => {
    props.onCreateEvent(params, props.id)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { currentTarget } = event;
    const formData = new FormData(currentTarget);
    let details;
    if (!props.selected.place_id) {
      details = await Google.placesDetails(props.selected);
    }
    let venue;
    if (details) {
      venue = await Venue.update(props.selected.id, {venues: details})
      venue = details
    } else {
      console.log('props.selected: ', props.selected);
      venue = props.selected
    }

    createEventOnSubmit({
      event: {
        title: formData.get("title"),
        date_time: formData.get("date_time"),
        address: props.selected.address,
        venue_id: props.selected.id,
        contact: venue.international_phone_number
      }
    })
  }

  useEffect(() => {
    setErrors([props.errors])
  }, [props.errors])

  useEffect(() => {
    setErrors([])
  }, [props.events])

  useEffect(() => {
    setErrors([])
  }, [])

  return (
    <div className="EventsNewPage">
      <form className="form"onSubmit={handleSubmit}>
        {errors.length > 0 && (
          <div className="FormErrors">
            {errors.map(error => <div className="red error" key={error}>{error}</div>)}
          </div>
        )}
        <div>
          <label className="label" htmlFor="title">Event Title</label> <br/>
          <input className="input" name="title" id="title" />
        </div>
        <div>
          <label className="label" htmlFor="date_time">Date</label> <br/>
          <input className="input" type="date" name="date_time" />
        </div>
        <div>
          <input className="button" type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
};

const errorSelector = createSelector(
  state => state.errors,
  errors => errors
);

const eventSelector = createSelector(
  state => state.events,
  events => events
);

const mapStateToProps = createSelector(
  eventSelector, errorSelector,
  (events, errors) => ({
    events,
    errors
  })
);

const mapDispatchToProps = {
  onCreateEvent: createEvent
}

export default connect(mapStateToProps, mapDispatchToProps)(EventsNewPage);