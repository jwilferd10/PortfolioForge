// utils imports
import { writeFile, copyGenericCSSFile } from './utils/generate-site.js';
import { clearDistDirectory } from './utils/clearDistDirectory.js';

// src imports
import { generatePage } from './src/page-template.js';
import { promptAbout } from './src/promptAbout.js';
import { promptContact } from './src/promptContact.js'
import { promptSkills } from './src/promptSkills.js'
import { promptEducation } from './src/promptEducation.js';
import { promptProject } from './src/promptProject.js';
import { promptSocialMedia } from './src/promptSocialMedia.js';
import { promptUser } from './src/promptUser.js';

// Main execution of project
const main = async () => {
  try {
    // Clear /dist directory when user initializes the app
    clearDistDirectory();

    // Await for promptUser, the module's data will be userResponses
    const userResponses = await promptUser();

    // Run confirmAbout if confirmed
    if (userResponses.confirmAbout) {
      await promptAbout(userResponses);
    }

    // Run confirmSkills if confirmed
    if (userResponses.confirmSkills) {
      await promptSkills(userResponses);
    }

    // Run promptSocialMedia if confirmed
    if (userResponses.confirmSocialMedia) {
      await promptSocialMedia(userResponses);
    }

    // Run promptEducation if confirmed
    if (userResponses.confirmEducation) {
      await promptEducation(userResponses);
    }

    if (userResponses.confirmContact) {
      await promptContact(userResponses);
    }

    // Run promptProject and colleect module's data as portfolio data, pass onto pageHTML
    const portfolioData = await promptProject(userResponses);
    const pageHTML = generatePage(portfolioData)

    // Generate the appropriate files
    await writeFile(pageHTML);
    await copyGenericCSSFile();

    console.log('Portfolio generated successfully.');
  } catch (error) {
    console.error('An error has occurred:', error.message);
  }
};

main();