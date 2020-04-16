//Calling methods to render index.html dom
//initilize an app object
const app = new App();
//call apps method to render all event listeners.
app.attachEventListeners();

//Renders all users on index.html #users-lists
app.adapter.fetchUsers().then((json) => {
  json.forEach((user) => {
    const newUser = new User(user);
    document.querySelector("#users-lists").innerHTML += newUser.renderUser();
  });
});
