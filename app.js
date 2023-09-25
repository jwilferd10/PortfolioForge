// Importing necessary modules
import inquirer from 'inquirer';
import { writeFile, copyGenericCSSFile } from './utils/generate-site.js';
import { generatePage } from './src/page-template.js';
import { clearDistDirectory } from './utils/clearDistDirectory.js';
import { promptEducation } from './src/promptEducation.js';
import { promptProject } from './src/promptProject.js';
import { promptSocialMedia } from './src/promptSocialMedia.js';
import { promptUser } from './src/promptUser.js';

clearDistDirectory();
promptUser()
  .then(userResponses => {
    // Check if the user is including Social Media links
    if (userResponses.confirmSocialMedia) {
        return promptSocialMedia(userResponses);
    };

    // Check if the user is including Education/Certifications
    if (userResponses.confirmEducation) {
      // Call promptEducation and pass portfolioData
      return promptEducation(userResponses).then(educationData => ({
        ...userResponses,
        educationData
      }));
    }
    return userResponses;
  })
  // Prompt for project information
  .then(promptProject)
  // Generate the HTML page based on provided user data
  .then(portfolioData => {
    return generatePage(portfolioData);
  })
  // Write generated HTML onto file
  .then(pageHTML => {
    return writeFile(pageHTML);
  })
  // Copy CSS File and return it
  .then(writeFileResponse => {
    console.log(writeFileResponse);
    return copyGenericCSSFile();
  })
  // Log success message after copying files
  .then(copyFileResponse => {
    console.log(copyFileResponse);
  })
  // Handle any errors that occur during the process
  .catch(err => {
    console.log(err);
  });
