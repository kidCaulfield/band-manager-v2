export const Venue = {
  async all() {
    const response = await fetch('/venues');
    const json = await response.json();

    if (response.status !== 200) {
      throw Error(json.error)
    }
    return json
  },
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