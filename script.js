const grid = document.querySelector('#portfolio-grid');

async function renderProjects() {
  const response = await fetch('projects.json');
  const projects = await response.json();

  grid.innerHTML = projects.map(p => `
    <div class="project-card">
      <h3>${p.name}</h3>
      <p>${p.description}</p>
      <div class="tech-tags">
        ${p.tech.map(t => `<span class="tag">${t}</span>`).join('')}
      </div>
      <a href="${p.url}" target="_blank" rel="noopener">View Project</a>
    </div>
  `).join('');
}

renderProjects();
