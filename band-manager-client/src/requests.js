export const Venue = {
  async all() {
    const response = await fetch('/venues');
    const json = await response.json();

    if (response.status !== 200) {
      throw Error(json.error)
    }
    return json
  }
}