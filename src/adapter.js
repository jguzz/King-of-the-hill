// Controlls all fetch requests

class Adapter {
  constructor() {
    this.baseUrl = "http://localhost:3000/api/v1";
    this.headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
  }
  //Gets users from server
  fetchUsers() {
    return this.get(`${this.baseUrl}/users`);
  }

  //Updates users based on id and passed in body
  updateUser(id, body) {
    return this.patch(`${this.baseUrl}/users/${id}`, body);
  }
  //makes a fetch quest to retrieve data

  get(url) {
    return fetch(url).then((res) => res.json());
  }

  //Makes a patch request to update data
  patch(url, body) {
    return fetch(url, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(body),
    }).then((res) => res.json());
  }
}
