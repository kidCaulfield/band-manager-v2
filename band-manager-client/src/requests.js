export const User = {
  async create(params) {
    const response = await fetch('/users', {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(params)
    });
    const newUser = await response.json();

    return newUser
  }
};

export const Session = {
  async create(params) {
    const response = await fetch('/session', {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(params)
    });
    const session = await response.json();

    return session;
  },
  async destroy() {
    const response = await fetch(`/session`, {
      method: "DELETE",
      credentials: "include"
    });
    const sessionOver = await response.json();
    return sessionOver
  },
  async getCurrentSession() {
     const response = await fetch(`/session`);
     const json = await response.json();
     return json;
  }
}

export const Venue = {
  async all() {
    const response = await fetch('/venues');
    const json = await response.json();

    return json
  },
  async update(id, params) {
    const response = await fetch(`/venue/${id}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(params)
    });
    const json = await response.json();

    return json
  }
};

export const Tour = {
  async create(params) {
    const response = await fetch('/tours', {
      method: 'POST',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(params)
    });
    const json = await response.json();
    
    return json
  },
  async all() {
    const response = await fetch('/tours');
    const json = await response.json();

    return json
  },
  async one(id) {
    const response = await fetch(`/tours/${id}`);
    const json = await response.json();

    return json;
  }
}

export const Event = {
  async edit(tourId, eventId) {
    const response = await fetch(`/tours/${tourId}/event/${eventId}`)
    const json = await response.json();
    return json;
  },
  async create(params, id) {
    const response = await fetch(`/tours/${id}/events`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(params)
    });
    const json = await response.json();

    return json
  },
  async all(id) {
    const response = await fetch(`/tours/${id}/events`);
    const json = await response.json();

    return json
  },
  async update(tourId, eventId, params) {
    const response = await fetch(`/tours/${tourId}/event/${eventId}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(params)
    });
    const json = await response.json();

    return json
  },
  async delete(tourId, eventId) {
    const response = await fetch(`/tours/${tourId}/events/${eventId}`, {
      method: 'DELETE'
    });
    
    return response
  }
};

export const Location = {
  async countries() {
    const response = await fetch(`/countries`);
    const json = await response.json();

    return json;
  },
  async regions(params) {
    const response = await fetch(`/regions`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(params)
    });
    const json = await response.json();

    return json;
  },
  async cities(params) {
    const response = await fetch(`/cities`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(params)
    });
    const json = await response.json();

    return json;
  }
};

export const Google = {
  async placesDetails(place) {
    const response = await fetch(`/google-places`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(place)
    });
  const json = await response.json();

  return json
  }
};