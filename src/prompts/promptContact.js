import inquirer from 'inquirer';

// Prompt users to input some form of contact detail for this section
export const promptContact = async (portfolioData) => {
    // set as an empty array if portfolioData.about is false
    if (!portfolioData.contact) {
        portfolioData.contact = [];
    }

    console.log(`
    =================================
    Include Some Contact Information!
    =================================
  `);

    console.log(`
        End off with a Contact Me page! Usually included is an email or a phone-number.
        -------------------------------------------------------------------------------
    `);

    // While true, keep running the same round of questions
    while (true) {
        const contactData = await inquirer.prompt([
            {
                type: 'input',
                name: 'contactInfo',
                message: 'Provide contact information:',
                validate: contactInput => contactInput ? true : 'Please provide some details for this section!',
            }
        ]);

        portfolioData.contact.push(contactData);
        
        // Ask if users want to add another paragraph
        const addMoreContent = await inquirer.prompt({
            type: 'confirm',
            name: 'addMoreContent',
            message: 'Would you like to provide additional information?',
            default: false,
        });

        // Exit out when not true
        if (!addMoreContent.addMoreContent) {
            break;
        }
    }

    return portfolioData;
};