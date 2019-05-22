const BASE_URL = `http://localhost:5000/api`

export const User = {
  async create(params) {
    try {
      const response = await fetch(`${BASE_URL}/users`, {
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
      const response = await fetch(`${BASE_URL}/session`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(params)
      });
      console.log(`response2: `, response);
      const session = await response.json();

      return session;
    } catch (error) {
      console.error(error)
    }
  },
  async destroy() {
    try {
      const response = await fetch(`${BASE_URL}/session`, {
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
     const response = await fetch(`${BASE_URL}/session`, {
        credentials: 'include'
      });
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
      const response = await fetch(`${BASE_URL}/venues`, {
        credentials: 'include'
      });
      const json = await response.json();

      return json
    } catch (error) {
      console.error(error)
    }
  },
  async update(id, params) {
    try {
      const response = await fetch(`${BASE_URL}/venue/${id}`, {
        method: `PATCH`,
        credentials: `include`,
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
      const response = await fetch(`${BASE_URL}/tours`, {
        method: `POST`,
        credentials: `include`,
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
      const response = await fetch(`${BASE_URL}/tours`, {
        credentials: 'include'
      });
      const json = await response.json();

      return json
    } catch (error) {
      console.error(error)
    }
  },
  async one(id) {
    try {
      const response = await fetch(`${BASE_URL}/tours/${id}`, {
        credentials: 'include'
      });
      const json = await response.json();

      return json;
    } catch (error) {
      console.error(error)
    }
  },
  async update(params, id) {
    try {
      const response = await fetch(`${BASE_URL}/tour/${id}`, {
        method: `PATCH`,
        credentials: `include`,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(params)
      })
      const json = await response.json();

      return json;
    } catch (error) {
      console.error(error)
    }
  },
  async allConfirmed() {
    try {
      const response = await fetch(`${BASE_URL}/confirmedtours`, {
        credentials: 'include'
      })
      const json = await response.json();

      return json;
    } catch (error) {
      console.error(error)
    }
  }
};

export const Event = {
  async edit(tourId, eventId) {
    try {
      const response = await fetch(`${BASE_URL}/tours/${tourId}/event/${eventId}`, {
        credentials: 'include'
      })
      const json = await response.json();
      return json;
    } catch (error) {
      console.error(error)
    }
  },
  async create(params, id) {
    try {
      const response = await fetch(`${BASE_URL}/tours/${id}/events`, {
        method: `POST`,
        credentials: `include`,
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
      const response = await fetch(`${BASE_URL}/tours/${id}/events`, {
        credentials: 'include'
      });
      const json = await response.json();

      return json
    } catch (error) {
      console.error(error)
    }
  },
  async update(tourId, eventId, params) {
    try {
      const response = await fetch(`${BASE_URL}/tours/${tourId}/event/${eventId}`, {
        method: `PATCH`,
        credentials: `include`,
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
      const response = await fetch(`${BASE_URL}/tours/${tourId}/events/${eventId}`, {
        method: `DELETE`
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
      const response = await fetch(`${BASE_URL}/countries`, {
        credentials: 'include'
      });
      const json = await response.json();

      return json;
    } catch (error) {
      console.error(error)
    }
  },
  async regions(params) {
    try {
      const response = await fetch(`${BASE_URL}/regions`, {
        method: `POST`,
        credentials: `include`,
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
      const response = await fetch(`${BASE_URL}/cities`, {
        method: `POST`,
        credentials: `include`,
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
    const response = await fetch(`${BASE_URL}/location/${id}`, {
      method: `PATCH`,
      credentials: `include`,
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
      const response = await fetch(`${BASE_URL}/google-places`, {
        method: `POST`,
        credentials: `include`,
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
      const response = await fetch(`${BASE_URL}/google-place`, {
        method: `POST`,
        credentials: `include`,
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