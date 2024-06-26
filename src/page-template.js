import { copySelectedCSSFile } from '../utils/generate-site.js';

// Mapping object for colorTheme
const colorThemeMapping = {
  "Default": "default.css",
  "Deep Lavender & Charcoal": "deep-lavender.css",
  "Dusk Pink & Slate Gray": "dusk-pink.css",
  "Darker Pastel Plum & Teal": "darker-pastel.css",
  "Gentle Peach & Lilac": "gentle-peach.css",
  "Serenity": "serenity.css",
  "Soothing Lavender & Mint": "lavender-mint.css",
  "Blue & Silver": "blue-silver.css",
  "Soft Pastel Delight": "soft-pastel.css",
  "Muted Earth Tones": "earth-tones.css"
};

// Portfolio Emoji's
const emojiMapping = {
  comment: '<i class="fas fa-comment-dots"></i>',
  tools: '<i class="fas fa-tools"></i>',
  database: '<i class="fas fa-database"></i>',
  book: '<i class="fas fa-book"></i>',
  briefcase: '<i class="fas fa-briefcase"></i>',
};

// User About Section
const generateAbout = (aboutTextArr, emojis) => {
  if (!aboutTextArr || aboutTextArr.length === 0) {
    return '';
  }

  const emojiType = emojis ? emojiMapping.comment : '';
  const emojiHeader = generateEmojiHeader(emojiType);

  const aboutMeText = aboutTextArr.map(({ aboutText }) => {
    return `
      <p>${aboutText}</p>
    `;
  }).join(' ');

  return `
    <section class="my-3" id="about">
      <h2 class="text-dark bg-primary p-2 display-inline-block rounded-edges1 box-shadow1 px-3 mb-3">
        ${emojiHeader} About Me
      </h2>
      <section class="my-3 aboutText">
        ${aboutMeText}
      </section>
    </section>
  `;
};

// User Skills Section
const generateSkillsPage = (skillsTextArr, emojis) => {
  if (!skillsTextArr || skillsTextArr.length === 0) {
    return '';
  }

  const emojiType = emojis ? emojiMapping.tools : '';
  const emojiHeader = generateEmojiHeader(emojiType);

  const skillsContent = skillsTextArr.map(({ skillsText }) => {
    return `
      <p>${skillsText}</p>
    `;
  }).join(' ');

  return `
    <section class="my-3" id="skills">
      <h2 class="text-dark bg-primary p-2 display-inline-block rounded-edges1 box-shadow1 px-3 mb-3">
        ${emojiHeader} Skills
      </h2>
      <p>${skillsContent}</p>
    </section>
  `;
};

// Programming Languages
const generateLanguageSpread = (languageSpread, emojis) => {
  // Return an empty string if there are no languages provided or the array is empty
  if (!languageSpread || languageSpread.length === 0) {
    return '';
  }

  const emojiType = emojis ? emojiMapping.database : '';
  const emojiHeader = generateEmojiHeader(emojiType);

  return `
    <section class="my-3" id="programmingLanguages">
      <h2 class="text-dark bg-primary p-2 display-inline-block rounded-edges1 box-shadow1 px-3 mb-3">
        ${emojiHeader} Programming Languages
      </h2>
      <p>${languageSpread.join(', ')}</p>
    </section>
  `;
};

// Generate HTML cards for user achievements
const generateAchievements = (achievementArr, emojis) => {
  // Check if the array is defined and is an array, return empty string if not.
  if (!achievementArr || achievementArr.length === 0) {
    return '';
  }

  const emojiType = emojis ? emojiMapping.book : '';
  const emojiHeader = generateEmojiHeader(emojiType);

  const featuredAchievements = achievementArr.map(({ achievementName, achievementDescription }) => {
    return `
      <article class="col-12 mb-2 bg-dark text-light p-3 rounded-edges2 box-shadow2">
        <h3 class="portfolio-item-title text-light">${achievementName}</h3>
        <h4 class="portfolio-languages">${achievementDescription}</h4>
      </article>
    `;
  }).join(' ');

  if (featuredAchievements.length === 0) {
    // Return an empty string if there are no featured achievegments
    return '';
  }

  return `
    <section class="my-3" id="achievements">
      <h2 class="text-dark bg-primary p-2 display-inline-block rounded-edges1 box-shadow1 mb-3 px-3 target1">
        ${emojiHeader} Education & Achievements
      </h2>
      <section class="flex-row justify-space-between">
        ${featuredAchievements}
      </section>
    </section>
  `;
};

// Generate the HTML containing project data
const generateProjects = (projectsArr, emojis) => {

  const emojiType = emojis ? emojiMapping.briefcase : '';
  const emojiHeader = generateEmojiHeader(emojiType);

  // In order: Featured and Non-Featured card templates
  return `
    <article class="my-3" id="portfolio">
      <h2 class="text-dark bg-primary p-2 display-inline-block rounded-edges1 box-shadow1 px-3 mb-3">
        ${emojiHeader} Work
      </h2>
      <section class="flex-row justify-space-between">
        ${projectsArr.filter(({ feature }) => feature).map(({ name, description, languages, link }) => {
          return `
            <article class="col-12 mb-2 bg-dark text-light p-3 rounded-edges2 box-shadow2 target1">
              <header class="text-center">
                <h3 class="portfolio-item-title text-light">${name}</h3>
                <h4 class="portfolio-languages">
                  Built With:
                  ${languages.join(', ')}
                </h4>
              </header>

              <section>
                <p>${description}</p>
              </section>

              <footer class="text-center"
                <a href="${link}" class="btn">
                  <i class="fab fa-github mr-2"></i>
                  View Project on GitHub
                </a>
              </footer>
            </article>
          `;
        }).join(' ')}

        ${projectsArr.filter(({ feature }) => !feature).map(({ name, description, languages, link }) => { 
          return `
            <article class="col-12 col-md-6 mb-2 bg-dark text-light p-3 flex-column rounded-edges2 box-shadow2">
              <header>
                <h3 class="portfolio-item-title text-light">${name}</h3>
                <h4 class="portfolio-languages">
                  Built With:
                  ${languages.join(', ')}
                </h4>
              </header>

              <section>
                <p>${description}</p>
              </section>

              <footer>
                <a href="${link}" class="btn mt-auto">
                  <i class="fab fa-github mr-2"></i>
                  View Project on GitHub
                </a>
              </footer>
            </article>
          `;
        }).join('')}
      </section>
    </article>
  `;
};

// Select style.css based off of user choice
const selectColorTheme = cssFileName => {
  if (!cssFileName || !colorThemeMapping[cssFileName]) {
    // Use the default.css file
    cssFileName = 'default.css';
  }

  const selectedColorTheme = colorThemeMapping[cssFileName];

  // Otherwise, return HTML with appropriate data
  return `
    <link rel="stylesheet" href="${selectedColorTheme}">
  `;
};

const generateEmojiHeader = emojiHeader => {
  if (!emojiHeader) {
    return '';
  }

  return `${emojiHeader}`;
};

// Generate Social Media HTML
const generataSocialMediaLinksHTML = (socialMediaData) => {
  if (!socialMediaData || socialMediaData.length === 0) {
    return '';
  }

  return socialMediaData.map(socialMediaLink => {
    const platform = socialMediaLink.platform.toLowerCase();
    const username = socialMediaLink.username;

    // construct the URL based on thhe platform and username
    const url = `https://${platform}.com/${username}`;
    
    return `
      <a class="socialLinks ml-2 my-1 px-2 py-1 bg-secondary text-dark d-flex align-items-center" href="${url}">
        <i class="socialIcon fab fa-${platform} fa-2x"></i>
      </a>
    `;
  }).join('');
};


// Export function to generate entire page
export const generatePage = (templateData) => {
  // Destructure page data by section
  const { projects, about, skills, codingLanguages, education, colorTheme, confirmEmojis, socialMediaLinks, ...header } = templateData;

  // Copy the selected CSS file to the /dist directory
  const selectedCSSFile = colorThemeMapping[colorTheme];

  copySelectedCSSFile(selectedCSSFile)
    .then(() => {
      console.log(`${selectedCSSFile} Has been applied to your portfolio!`)
    })
    .catch((err) => {
      console.error(`Error with: ${selectedCSSFile}: ${err}`);
    });

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>${header.name}</title>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css">
      <link href="https://fonts.googleapis.com/css?family=Public+Sans:300i,300,500&display=swap" rel="stylesheet">
      <link rel="stylesheet" href="style.css">
      ${selectColorTheme(colorTheme)}
    </head>
  
    <body>
      <header>
        <section class="container flex-row justify-space-between align-center py-3">
          <h1 class="target1 page-title rounded-edges2 box-shadow2 spacing-five text-secondary bg-dark px-3">${header.name}</h1>
        </section>
        <nav class="container pb-4 flex-row justify-flex-start">
          ${generataSocialMediaLinksHTML(socialMediaLinks)}
        </nav>
      </header>

      <main class="container my-5">
        ${generateAbout(about, confirmEmojis)}
        ${generateAchievements(education, confirmEmojis)}
        ${generateProjects(projects, confirmEmojis)}
        ${generateLanguageSpread(codingLanguages, confirmEmojis)}
        ${generateSkillsPage(skills, confirmEmojis)}
      </main>

      <footer class="container text-center py-3">
        <h2 class="text-dark">&copy; ${new Date().getFullYear()} by ${header.name}</h2>
      </footer>
    </body>
    </html>
  `;
};