

getData();

fetch("https://knighteyes.github.io/devfolio/data.json")
.then(response => {
  if(!response.ok)
    throw new Error("Data not found.");
  return response.json();
})
.then(data => console.log(data))
.catch(error => console.log(error));
