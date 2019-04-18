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
  }
}