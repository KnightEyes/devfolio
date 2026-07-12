const container = document.querySelector('#project-container');

async function loadProjects() {
  try {
    const response = await fetch('projects.json');
    const projects = await response.json();

    projects.forEach(project => {
      const li = document.createElement('li');
      li.innerHTML = `<a href="${project.url}" target="_blank" rel="noopener">${project.name}</a>`;
      container.appendChild(li);
    });
  } catch (error) {
    console.error('Error loading projects:', error);
    container.innerHTML = '<li>Unable to load projects.</li>';
  }
}

loadProjects();
