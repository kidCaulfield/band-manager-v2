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
}

export const Session = { // sparatic bug here may lead to backend
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

    return session
  },
  async destroy() {
    const response = await fetch(`/session`, {
      method: "DELETE",
      credentials: "include"
    })
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

    return json
  }
}

export const Event = {
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
  }
}