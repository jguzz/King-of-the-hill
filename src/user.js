class User {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    User.all.push(this);
  }

  renderUser() {
    return `
	  <li>
		<h3>${this.name}
		  <button data-name=${this.name} data-id=${this.id}>edit</button>
		</h3>
	  </li>`;
  }

  static findById(id) {
    return this.all.find((user) => user.id === id);
  }

  renderUpdateForm() {
    return `
	  <form data-id=${this.id}>
		<label>Name</label>
		<p>
    <input type="text" value="${this.name}" />
		</p>
		<button type='submit'>Save User</button>
	  </form>
	  `;
  }

  update({ name }) {
    this.name = name;
  }
}

User.all = [];
