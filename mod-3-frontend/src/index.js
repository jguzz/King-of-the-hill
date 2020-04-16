//Calling methods to render index.js dom
console.log("hello there");

const app = new App();
app.attachEventListeners();

app.adapter.fetchUsers().then((json) => {
  json.forEach((user) => {
    const newUser = new User(user);
    document.querySelector("#users-lists").innerHTML += newUser.renderUser();
  });
});
