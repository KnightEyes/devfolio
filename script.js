fetch("https://knighteyes.github.io/devfolio/data.json")
  .then(response => alert(response.text()))
  .catch(error => alert(error));
