document.addEventListener('DOMContentLoaded', async () => {
    // Fetch experience data from JSON file and populate the experience grid
    try {
        const response = await fetch('experiences.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        const experienceGrid = document.getElementById('experienceGrid');
        experienceGrid.innerHTML = '';

        data.experiences.forEach(experience => {
            const experienceCard = createExperienceCard(experience);
            experienceGrid.appendChild(experienceCard);
        });
    } catch (error) {
        console.error('Error loading experiences:', error);
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.textContent = 'Unable to load experiences.';
        document.getElementById('experienceGrid').appendChild(errorMessage);
    }

    // Fetch projects data from JSON file and populate the projects grid
    try {
        const response = await fetch('projects.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        const projectsGrid = document.getElementById('projectsGrid');
        projectsGrid.innerHTML = '';

        data.projects.forEach(project => {
            const projectCard = createProjectCard(project);
            projectsGrid.appendChild(projectCard);
        });
    } catch (error) {
        console.error('Error loading projects:', error);
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.textContent = 'Unable to load projects.';
        document.getElementById('projectsGrid').appendChild(errorMessage);
    }
});

function createProjectCard(project) {
    // Create the card and content
    const project_card = document.createElement('article');
    project_card.className = 'project-card';
    const content = document.createElement('div');
    content.className = 'project-content';

    // Create and populate the title, time, and description
    const title = document.createElement('h3');
    title.textContent = project.title;
    const time = document.createElement('span');
    time.textContent = project.time;
    const description = document.createElement('p');
    description.textContent = project.description;

    // Assemble the element
    content.appendChild(title);
    content.appendChild(time);
    content.appendChild(description);
    project_card.appendChild(content);

    return project_card;
}

function createExperienceCard(experience) {
    // Create the card and content
    const experience_card = document.createElement('article');
    experience_card.className = 'experience-card';
    const experience_content = document.createElement('div');
    experience_content.className = 'experience-content';

    // Create and populate the title, time, location, and description
    const title = document.createElement('h3');
    title.textContent = experience.title;
    const time_and_location = document.createElement('span');
    time_and_location.innerHTML = `${experience.time} &nbsp; • &nbsp; ${experience.location}`;
    const description = document.createElement('p');
    description.textContent = experience.description;

    // Assemble the element
    experience_content.appendChild(title);
    experience_content.appendChild(time_and_location);
    experience_content.appendChild(description);
    experience_card.appendChild(experience_content);

    return experience_card;
}