export const User = {
  async create(params) {
    try {
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
    } catch (error) {
      console.error(error)
    }
  }
};

export const Session = {
  async create(params) {
    try {
    console.log('params3: ', params);
      const response = await fetch('/session', {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(params)
      });
      console.log('response2: ', response);
      const session = await response.json();

      return session;
    } catch (error) {
      console.error(error)
    }
  },
  async destroy() {
    try {
      const response = await fetch(`/session`, {
        method: "DELETE",
        credentials: "include"
      });
      const sessionOver = await response.json();
      return sessionOver
    } catch (error) {
      console.error(error)
    }
  },
  async getCurrentSession() {
    try {
     const response = await fetch(`/session`);
     const json = await response.json();
     return json;
    } catch (error) {
      console.error(error)
    }
  }
}

export const Venue = {
  async all() {
    try {
      const response = await fetch('/venues');
      const json = await response.json();

      return json
    } catch (error) {
      console.error(error)
    }
  },
  async update(id, params) {
    try {
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
    } catch (error) {
      console.error(error)
    }
  }
};

export const Tour = {
  async create(params) {
    try {
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
    } catch (error) {
      console.error(error)
    }
  },
  async all() {
    try {
      const response = await fetch('/tours');
      const json = await response.json();

      return json
    } catch (error) {
      console.error(error)
    }
  },
  async one(id) {
    try {
      const response = await fetch(`/tours/${id}`);
      const json = await response.json();

      return json;
    } catch (error) {
      console.error(error)
    }
  },
  async update(params, id) {
    const response = await fetch(`/tour/${id}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(params)
    })
    const json = await response.json();

    return json;
  },
  async allConfirmed() {
    const response = await fetch(`/confirmedtours`)
    const json = await response.json();

    return json;
  }
};

export const Event = {
  async edit(tourId, eventId) {
    try {
      const response = await fetch(`/tours/${tourId}/event/${eventId}`)
      const json = await response.json();
      return json;
    } catch (error) {
      console.error(error)
    }
  },
  async create(params, id) {
    try {
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
    } catch (error) {
      console.error(error)
    }
  },
  async all(id) {
    try {
      const response = await fetch(`/tours/${id}/events`);
      const json = await response.json();

      return json
    } catch (error) {
      console.error(error)
    }
  },
  async update(tourId, eventId, params) {
    try {
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
    } catch (error) {
      console.error(error)
    }
  },
  async delete(tourId, eventId) {
    try {
      const response = await fetch(`/tours/${tourId}/events/${eventId}`, {
        method: 'DELETE'
      });
      
      return response
    } catch (error) {
      console.error(error)
    }
  }
};

export const Location = {
  async countries() {
    try {
      const response = await fetch(`/countries`);
      const json = await response.json();

      return json;
    } catch (error) {
      console.error(error)
    }
  },
  async regions(params) {
    try {
      const response = await fetch(`/regions`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(params)
      });
      const json = await response.json();

      return json;
    } catch (error) {
      console.error(error)
    }
  },
  async cities(params) {
    try {
      const response = await fetch(`/cities`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(params)
      });
      const json = await response.json();

      return json;
    } catch (error) {
      console.error(error)
    }
  },
  async update(params, id) {
    try {
    const response = await fetch(`/location/${id}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(params)
    });
    const json = await response.json();

    return json;
    } catch (error) {
      console.error(error)
    }
  }
};

export const Google = {
  async placesDetails(place) {
    try {
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
    } catch (error) {
      console.error(error)
    }
  },
  async locationGeo(params) {
    try {
      const response = await fetch(`/google-place`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(params)
      });
      const json = await response.json();

      return json
    } catch (error) {
      console.error(error)
    }
  }
};