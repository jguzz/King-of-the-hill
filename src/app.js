//Class for all event listeners
class App {
  constructor() {
    this.adapter = new Adapter();

    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.createUsers = this.createUsers.bind(this);
    this.addUsers = this.addUsers.bind(this);
  }

  attachEventListeners() {
    document
      .querySelector("#users-lists")
      .addEventListener("click", this.handleEditClick);
    document
      .querySelector("#update")
      .addEventListener("submit", this.handleFormSubmit);
  }

  createUsers(users) {
    users.forEach((user) => {
      new User(user);
    });
    this.addUsers();
  }

  addUsers() {
    document.querySelector("#users-lists").innerHTML = "";
    User.all.forEach(
      (user) =>
        (document.querySelector("#users-lists").innerHTML += user.renderUser())
    );
  }

  handleFormSubmit(e) {
    e.preventDefault();
    const id = parseInt(e.target.dataset.id);
    const user = User.findById(id);
    const name = e.target.querySelector("input").value;

    const bodyJSON = { name };

    this.adapter.updateUser(user.id, bodyJSON).then((updatedUser) => {
      const user = User.findById(updatedUser.id);
      user.update(updatedUser);
      this.addUsers();
    });
  }

  handleEditClick(e) {
    const id = parseInt(e.target.dataset.id);
    const user = User.findById(id);
    document.querySelector("#update").innerHTML = user.renderUpdateForm();
  }
}
