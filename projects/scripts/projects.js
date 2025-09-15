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
    // Create the card wrapper and content
    const wrapper = document.createElement('article');
    wrapper.className = 'project-wrapper';
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
    wrapper.appendChild(content);

    return wrapper;
}

function createExperienceCard(experience) {
    // Create the card wrapper and content
    const wrapper = document.createElement('article');
    wrapper.className = 'experience-wrapper';
    const content = document.createElement('div');
    content.className = 'experience-content';

    // Create and populate the title, time, location, and description
    const title = document.createElement('h3');
    title.textContent = experience.title;
    const time_and_location = document.createElement('span');
    time_and_location.textContent = `${experience.time} | ${experience.location}`;
    const description = document.createElement('p');
    description.textContent = experience.description;

    // Assemble the element
    content.appendChild(title);
    content.appendChild(time_and_location);
    content.appendChild(description);
    wrapper.appendChild(content);

    return wrapper;
}