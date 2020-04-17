//Class for all event listeners

class App {
  constructor() {
    //Adds adapter.js functionality
    this.adapter = new Adapter();
    //attaches all app methods when a new App object is created.
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.createUsers = this.createUsers.bind(this);
    this.addUsers = this.addUsers.bind(this);
    this.handlePlayClick = this.handlePlayClick.bind(this);
  }

  //Addds all event listeners ot the dom.
  attachEventListeners() {
    document
      .querySelector("#edit-button")
      .addEventListener("click", this.handleEditClick);
    document
      .querySelector("#update")
      .addEventListener("submit", this.handleFormSubmit);
    document
      .querySelector("#play-button")
      .addEventListener("click", this.handlePlayClick);
  }

  createUsers(users) {
    users.forEach((user) => {
      new User(user);
    });
    this.addUsers();
  }

  //Adds all users to the users-lists id.
  addUsers() {
    document.querySelector("#users-lists").innerHTML = "";
    User.all.forEach(
      (user) =>
        (document.querySelector("#users-lists").innerHTML += user.renderUser())
    );
  }

  //method that will update users on page when submit is clicked.
  handleFormSubmit(e) {
    e.preventDefault();
    //Get the user object based on the data-id
    const id = parseInt(e.target.dataset.id);
    const user = User.findById(id);
    const name = e.target.querySelector("input").value;

    const bodyJSON = { name };

    //updates the user
    this.adapter.updateUser(user.id, bodyJSON).then((updatedUser) => {
      const user = User.findById(updatedUser.id);
      user.update(updatedUser);
      this.addUsers();
    });
  }

  //When edit is clicked, we render an edit form
  handleEditClick(e) {
    console.log(e.target);
    const id = parseInt(e.target.dataset.id);
    const user = User.findById(id);
    document.querySelector("#update").innerHTML = user.renderUpdateForm();
  }
  handlePlayClick(e) {
    const id = parseInt(e.target.dataset.id);
    const user = User.findById(id);
    document.querySelector("#game").innerHTML = user.playGame();
  }
}
