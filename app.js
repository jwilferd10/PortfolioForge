// utils imports
import { writeFile, copyGenericCSSFile } from './utils/generate-site.js';
import { clearDistDirectory } from './utils/clearDistDirectory.js';

// src imports
import { generatePage } from './src/page-template.js';
import { promptAbout } from './src/prompts/promptAbout.js';
import { promptContact } from './src/prompts/promptContact.js'
import { promptSkills } from './src/prompts/promptSkills.js'
import { promptEducation } from './src/prompts/promptEducation.js';
import { promptProject } from './src/prompts/promptProject.js';
import { promptSocialMedia } from './src/prompts/promptSocialMedia.js';
import { promptUser } from './src/prompts/promptUser.js';

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

    // If true, prompt project questions
    if (userResponses.confirmProjects) {
      await promptProject(userResponses);
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

    // Generate the HTML based off userResponses
    const pageHTML = generatePage(userResponses)

    // Generate the appropriate files
    await writeFile(pageHTML);
    await copyGenericCSSFile();

    console.log('Portfolio generated successfully.');
  } catch (error) {
    console.error('An error has occurred:', error.message);
  }
};

main();