// Importing inquirer
import inquirer from 'inquirer';

export const promptSkills = async (portfolioData) => {
    if (!portfolioData.skills) {
        portfolioData.skills = [];
    }

    // section introduction
    console.log(`
    ========================
    Highlight Your Skillset!
    ========================
  `);

  console.log(`
    Tell people what you perform best at. Explain what your strong points are.
    --------------------------------------------------------------------------
  `);

  // While true, keep running the same rounds of questions

  while (true) {
    const skillsData = await inquirer.prompt([
        {
            type: 'input',
            name: 'skillsText',
            message: 'Provide some details about your skillset:',
            validate: skillsInput => skillsInput ? true : 'Please provide some details for this section!'
        },
    ]);

    portfolioData.skills.push(skillsData);

    // As if user wants to add another paragraph
    const addMoreContent = await inquirer.prompt({
        type: 'confirm',
        name: 'addMoreContent',
        message: 'Do you want to add another paragraph for this section?',
        default: false,
    });

    // Exit out when not true
    if (!addMoreContent.addMoreContent) {
        break;
    }
  }

  return portfolioData;
};