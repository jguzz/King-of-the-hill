class User {
  //Creates a user object
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    User.all.push(this);
  }

  //Displays user name with edit button in a li
  renderUser() {
    return `
	  <li>
		<h3>${this.name}
		  <button data-name=${this.name} data-id=${this.id}>edit</button>
		</h3>
	  </li>`;
  }

  //Finds user by passed in id.
  static findById(id) {
    return this.all.find((user) => user.id === id);
  }

  //Returns a form for editing user.
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

  //updates user data.
  update({ name }) {
    this.name = name;
  }
}

User.all = [];
