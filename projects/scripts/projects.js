document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Fetch projects data from JSON file
        // console.log('Fetching from:', window.location.href.replace(/[^/]*$/, '') + 'projects.json');
        const response = await fetch('projects.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Get the projects grid container
        const projectsGrid = document.getElementById('projectsGrid');
        
        // Clear any existing content
        projectsGrid.innerHTML = '';

        // Create and append project cards
        data.projects.forEach(project => {
            const projectCard = createProjectCard(project);
            projectsGrid.appendChild(projectCard);
        });
    } catch (error) {
        console.error('Error loading projects:', error);
        // Add a simple error message to the grid
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.textContent = 'Unable to load projects.';
        document.getElementById('projectsGrid').appendChild(errorMessage);
    }
});

function createProjectCard(project) {
    // Create the card elements
    const article = document.createElement('article');
    article.className = 'project-card';

    const content = document.createElement('div');
    content.className = 'project-content';

    // Create and populate the title
    const title = document.createElement('h3');
    title.textContent = project.title;

    // Create and populate the time span
    const timeSpan = document.createElement('span');
    timeSpan.textContent = project.time;

    // Create and populate the description
    const description = document.createElement('p');
    description.textContent = project.content;

    // Assemble the card
    content.appendChild(title);
    content.appendChild(timeSpan);
    content.appendChild(description);
    article.appendChild(content);

    return article;
}