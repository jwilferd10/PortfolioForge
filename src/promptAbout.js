// Importing inquirer
import inquirer from 'inquirer';

// Prompt user to fill out an 'About' section for their portfolio
export const promptAbout = async (portfolioData) => {
    // set as an empty array if portfolioData.about is false
    if (!portfolioData.about) {
        portfolioData.about = [];
    }

    // section introduction
    console.log(`
    =============================================
    Describe Yourself With an 'About Me' Section!
    =============================================
  `);

    console.log("Start your portfolio strong with an 'About Me' section.")

    // While true, keep running the same round of questions
    while (true) {
        const aboutData = await inquirer.prompt([
            {
                type: 'input',
                name: 'aboutText',
                message: 'Provide some details about yourself:',
                validate: aboutMeInput => aboutMeInput ? true : 'Please provide some details for this section!',
            }
        ]);

        portfolioData.about.push(aboutData);

        console.log(aboutData);
        
        // Ask if users want to add another paragraph
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