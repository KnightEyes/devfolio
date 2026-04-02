fetch("https://knighteyes.github.io/devfolio/data.json")
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.log(error));

alert(2);
