

getData();

async function getData(){
  try{
    const response = await fetch("https://knighteyes.github.io/devfolio/data.json");
    if(!response.ok)
      throw new Error("Data not found.");
    const data = await response.json();
  } catch {
    console.error(error);
  }
}
alert(2);
