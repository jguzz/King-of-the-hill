//Calling methods to render index.html dom
//initilize an app object

//call apps method to render all event listeners.
//Renders all users on index.html #users-lists
const app = new App();
app.adapter.fetchUsers().then((json) => {
  json.forEach((user) => {
    const newUser = new User(user);
    document.querySelector("#users-lists").innerHTML += newUser.renderUser();
  });
  app.attachEventListeners();
});

