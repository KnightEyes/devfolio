



async function getData(){
  try{
    const response = await fetch("https://knighteyes.github.io/devfolio/data.json");
  } catch {
    console.error(error);
  }
}
