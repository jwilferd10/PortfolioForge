import { copySelectedCSSFile } from '../utils/generate-site.js';
import { generateAbout } from './template-utils/generateAbout.js';
import { generateSkillsPage } from './template-utils/generateSkillsPage.js';
import { generateLanguageSpread } from './template-utils/generateLanguageSpread.js';
import { generateAchievements } from './template-utils/generateAchievements.js';
import { generateProjects } from './template-utils/generateProjects.js';
import { generateContact } from './template-utils/generateContacts.js';
import { colorThemeMapping, selectColorTheme } from './template-utils/selectColorTheme.js';
import { generataSocialMediaLinksHTML } from './template-utils/generateSocialMediaLinks.js';

// Export function to generate entire page
export const generatePage = (templateData) => {
  // Destructure page data by section
  const { projects, about, skills, codingLanguages, education, colorTheme, confirmEmojis, socialMediaLinks, contact, ...header } = templateData;

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
        ${generateContact(contact, confirmEmojis)}
      </main>

      <footer class="container text-center py-3">
        <h2 class="text-dark">&copy; ${new Date().getFullYear()} by ${header.name}</h2>
      </footer>
    </body>
    </html>
  `;
};