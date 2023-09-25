// Function to prompt user about Education and Certification achievements
const promptEducation = portfolioData => {
    if (!portfolioData.education) {
      portfolioData.education = [];
    }
  
      console.log(`
      ==============================================
      Enter Education and Certification Achievements
      ==============================================
    `);
  
    // Name of Education and Certification, Description
    return inquirer.prompt([
      {
        type: 'input',
        name: 'achievementName',
        message: 'What name can you provide? (Required)',
        validate: achievementNameInput => {
          if (achievementNameInput) {
            return true;
          } else {
            console.log('Please enter a name or title!');
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'achievementDescription',
        message: 'Provide a description of your achievements (Required)'
      }, 
    ]).then((educationData) => {
      portfolioData.education.push(educationData);
      // Return the updated portfolioData
      return portfolioData;
    });
};