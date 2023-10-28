// Importing inquirer
import inquirer from 'inquirer';

// Function to prompt user about Education and Certification achievements
export const promptEducation = async (portfolioData) => {
  if (!portfolioData.education) {
    portfolioData.education = [];
  }
  
  console.log(`
    ==============================================
    Enter Education and Certification Achievements
    ==============================================
  `);

  console.log(`
    Providing educational details can help showcase your knowledge over a subject.
    ------------------------------------------------------------------------------
  `);
  
  // Name of Education and Certification, Description
  while (true) {
    const educationData = await inquirer.prompt([
      {
        type: 'input',
        name: 'achievementName',
        message: 'Enter a name or title:',
        validate: achievementNameInput => achievementNameInput ? true : 'Please provide a name or title!',
      },
      {
        type: 'input',
        name: 'achievementDescription',
        message: 'Enter a description:',
        validate: achievementDescriptionInput => achievementDescriptionInput ? true : 'Please provide a description!',
      }
    ]);

    portfolioData.education.push(educationData);

    // Ask the user if they'd like to add another detail
    const addMore = await inquirer.prompt({
      type: 'confirm',
      name: 'addMore',
      message: 'Do you want to add another noteworthy achievement?',
      default: false,
    });

    if (!addMore.addMore) {
      break;
    }
  }

  return portfolioData;
};