// Controlls all fetch requests

class Adapter {
  constructor() {
    this.baseUrl = "http://localhost:3000/api/v1";
    this.headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
  }
  fetchUsers() {
    return this.get(`${this.baseUrl}/users`);
  }

  updateUser(id, body) {
    return this.patch(`${this.baseUrl}/users/${id}`, body);
  }

  get(url) {
    return fetch(url).then((res) => res.json());
  }

  patch(url, body) {
    return fetch(url, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(body),
    }).then((res) => res.json());
  }
}
