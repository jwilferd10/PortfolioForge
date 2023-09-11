// User About Section
const generateAbout = aboutText => {
  if (!aboutText) {
    return '';
  }

  return `
    <section class="my-3" id="about">
      <h2 class="text-dark bg-primary p-2 display-inline-block">About Me</h2>
      <p>${aboutText}</p>
    </section>
  `;
};

// User Skills Section
const generateSkillsPage = skillsText => {
  if (!skillsText) {
    return '';
  }

  return `
    <section class="my-3" id="skills">
      <h2 class="text-dark bg-primary p-2 display-inline-block">Skills</h2>
      <p>${skillsText}</p>
    </section
  `;
};

// Programming Languages
const generateLanguageSpread = languageSpread => {
  // Return an empty string if there are no languages provided or the array is empty
  if (!languageSpread || languageSpread.length === 0) {
    return '';
  }

  return `
    <section class="my-3" id="programmingLanguages">
      <h3 class="text-dark bg-primary p-2 display-inline-block">Programming Languages</h3>
      <p>${languageSpread.join(', ')}</p>
    </section>
  `;
};

// Generate HTML cards for user achievements
const generateAchievements = (achievementArr) => {
  // Check if the array is defined and is an array, return empty string if not.
  if (!achievementArr || achievementArr.length === 0) {
    return '';
  }

  const featuredAchievements = achievementArr.map(({ achievementName, achievementDescription }) => {
    return `
      <div class="col-12 mb-2 bg-dark text-light p-3">
        <h3 class="portfolio-item-title text-light">${achievementName}</h3>
        <h5 class="portfolio-languages">${achievementDescription}</h5>
      </div>
    `;
  }).join(' ');

  if (featuredAchievements.length === 0) {
    // Return an empty string if there are no featured achievegments
    return '';
  }

  return `
    <section class="my-3" id="achievements">
      <h2 class="text-dark bg-primary p-2 display-inline-block">Education & Achievements</h2>
      <div class="flex-row justify-space-between">
        ${featuredAchievements}
      </div>
    </section>
  `;
};

// Generate the HTML containing project data
const generateProjects = projectsArr => {
  return `
    <section class="my-3" id="portfolio">
      <h2 class="text-dark bg-primary p-2 display-inline-block">Work</h2>
      <div class="flex-row justify-space-between">
      ${projectsArr.filter(({ feature }) => feature).map(({ name, description, languages, link }) => {
        return `
          <div class="col-12 mb-2 bg-dark text-light p-3">
            <h3 class="portfolio-item-title text-light">${name}</h3>
            <h5 class="portfolio-languages">
              Built With:
              ${languages.join(', ')}
            </h5>
            <p>${description}</p>
            <a href="${link}" class="btn"><i class="fab fa-github mr-2"></i>View Project on GitHub</a>
          </div>
        `;
      }).join(' ')}

      ${projectsArr.filter(({ feature }) => !feature).map(({ name, description, languages, link }) => { 
        return `
          <div class="col-12 col-md-6 mb-2 bg-dark text-light p-3 flex-column">
            <h3 class="portfolio-item-title text-light">${name}</h3>
            <h5 class="portfolio-languages">
              Built With:
              ${languages.join(', ')}
            </h5>
            <p>${description}</p>
            <a href="${link}" class="btn mt-auto"><i class="fab fa-github mr-2"></i>View Project on GitHub</a>
          </div>
        `;
        }).join('')}
        </div>
      </section>
  `;
}

// Export function to generate entire page
export const generatePage = (templateData) => {
  // Destructure page data by section
  const { projects, about, skills, codingLanguages, education, ...header } = templateData;

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Portfolio Demo</title>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css">
      <link href="https://fonts.googleapis.com/css?family=Public+Sans:300i,300,500&display=swap" rel="stylesheet">
      <link rel="stylesheet" href="style.css">
    </head>
  
    <body>
      <header>
        <div class="container flex-row justify-space-between align-center py-3">
          <h1 class="page-title text-secondary bg-dark py-2 px-3">${header.name}</h1>
          <nav class="flex-row">
            <a class="ml-2 my-1 px-2 py-1 bg-secondary text-dark" href="https://github.com/${header.github}">GitHub</a>
          </nav>
        </div>
      </header>

      <main class="container my-5">
        ${generateAbout(about)}
        ${generateSkillsPage(skills)}
        ${generateLanguageSpread(codingLanguages)}
        ${generateAchievements(education)}
        ${generateProjects(projects)}
      </main>

      <footer class="container text-center py-3">
        <h3 class="text-dark">&copy; ${new Date().getFullYear()} by ${header.name}</h3>
      </footer>
    </body>
    </html>
  `;
};