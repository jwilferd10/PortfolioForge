// Importing necessary modules
import inquirer from 'inquirer';
import { writeFile, copyGenericCSSFile } from './utils/generate-site.js';
import { generatePage } from './src/page-template.js';
import { clearDistDirectory } from './utils/clearDistDirectory.js';

// Function to prompt the user for information they wish to include
const promptUser = () => {
  return inquirer.prompt([
    {
      type: 'input', 
      name: 'name',
      message: 'What is your name?',
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('Please enter your name!');
          return false;
        }
      }
    },
    // {
    //   type: 'input',
    //   name: 'github',
    //   message: 'Enter your GitHub username',
    //   validate: nameInput => {
    //     if (nameInput) {
    //       return true;
    //     } else {
    //       console.log('Please enter your GitHub Username');
    //       return false;
    //     }
    //   }
    // },
    {
      type: 'confirm',
      name: 'confirmSocialMedia',
      message: 'Would you like to include Social Media links?',
      default: true,
      validate: ({ confirmSocialMedia }) => {
        if (confirmSocialMedia) {
          return true;
        } else {
          return false;
        }
      }
    },
    {
      type: 'confirm',
      name: 'confirmAbout',
      message: 'Would you like to enter some information about yourself for an "About" section?',
      default: true,
      validate: ({ confirmAbout }) => {
        if (confirmAbout) {
          return true;
        } else {
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'about',
      message: 'Provide some information about yourself:',
      when: ({ confirmAbout }) => confirmAbout
    },
    {
      type: 'confirm',
      name: 'confirmSkills',
      message: 'Would you like to provide some information highlighting your skills?',
      default: true,
      validate: ({ confirmSkills }) => {
        if (confirmSkills) {
          return true;
        } else {
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'skills',
      message: 'Provide some details about your skillset:',
      when: ({ confirmSkills }) => confirmSkills
    },
    {
      type: 'confirm', 
      name: 'confirmLanguages',
      message: 'Would you like to highlight any programming languages?',
      default: true,
      validate: ({ confirmLanguages }) => {
        if (confirmLanguages) {
          return true;
        } else { 
          return false;
        }
      }
    },
    {
      type: 'checkbox',
      name: 'codingLanguages',
      message: 'What languages would you like to include?',
      choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node.js', 'Python', 'Java', 'Ruby', 'C++', 'PHP', 'Swift', 'TypeScript', 'Go', 'Rust', 'Kotlin', 'SQL', 'Perl', 'C#', 'Dart', 'Scala', 'Haskell', 'Objective-C', 'Lua'],
      when: ({ confirmLanguages }) => confirmLanguages
    },
    {
      type: 'confirm',
      name: 'confirmEducation',
      message: "Do you have any Education and Certification achievements you'd like to feature?",
      default: true,
      validate: ({ confirmEducation }) => {
        if (confirmEducation) {
          return true;
        } else {
          return false;
        }
      }
    },
    {
      type: 'confirm',
      name: 'confirmEmojis',
      message: 'Do you want to include emojis in your headers?',
      default: false,
      validate: ({ emojis }) => {
        if (emojis) {
          return true;
        } else {
          return false;
        }
      }
    },
    {
      type: 'rawlist',
      name: 'colorTheme',
      message: 'Pick a color theme for your portfolio.',
      choices: ["Default", "Deep Lavender & Charcoal", "Dusk Pink & Slate Gray", "Darker Pastel Plum & Teal", "Gentle Peach & Lilac", "Serenity", "Soothing Lavender & Mint", "Blue & Silver", "Soft Pastel Delight", "Muted Earth Tones"],
      default: 0,
    }
  ])
};

// Function to prompt users if they'd like to include social media links
const promptSocialMedia = portfolioData => {
  console.log(`
    ==================
    Social Media Links
    ==================
  `);

  if (!portfolioData.header) {
    // Initialize header object if it doesn't exist
    portfolioData.header = {};
  }

  // Array to store social media links
  const socialMediaLinks = [];

  // Array of Social Media Platforms
  const socialMediaPlatforms = [
    {
      name: 'GitHub',
      key: 'githubLink',
    },
    {
      name: 'LinkedIn',
      key: 'linkedInLink',
    },
    {
      name: 'YouTube',
      key: 'youTubeLink',
    },
    {
      name: 'Facebook',
      key: 'faceBookLink',
    }
  ]

  // Prompt user for each social media link
  return inquirer.prompt(socialMediaPlatforms.map(platform => ({
    type: 'confirm',
    name: platform.key,
    message: `Would you like to include a ${platform.name} link?`,
    default: true,
  })))
  .then(async answers => {
    // Prompt for usernames and store them in the socialMediaLinks array. Start with For Each
    for (const platform of socialMediaPlatforms) {
      if (answers[platform.key]) {
        const usernameAnswer = await inquirer.prompt({
          type: 'input',
          name: platform.key,
          message: `Enter your ${platform.name} username`,
        });
        if (usernameAnswer[platform.key]) {
          socialMediaLinks.push({
            platform: platform.name,
            username: usernameAnswer[platform.key],
          });
        }
      }
    }

    // Store the social media links in portfolioData 
    portfolioData.socialMediaLinks = socialMediaLinks;

    return portfolioData;
  });
}

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

// Function to prompt the user for project information
const promptProject = (portfolioData) => {
  if (!portfolioData.projects) {
    portfolioData.projects = [];
  } 

  console.log(`
    =================
    Add a New Project
    =================
  `);

  // Project Name, Descrpition, Structural Languages, Link, Feature
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of your project?',
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log("Please enter your project's name!");
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'description',
      message: 'Provide a description of the project (Required)'
    },
    {
      type: 'checkbox',
      name: 'languages',
      message: 'What did you build this project with? (Check all that apply)',
      choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node'] 
    },
    {
      type: 'input',
      name: 'link',
      message: 'Enter the GitHub link to your project. (Required)',
      validate: linkInput => {
        if (linkInput) {
          return true;
        } else {
          console.log('You need to enter a GitHub link for your project!');
          return false;
        }
      }
    },
    {
      type: 'confirm',
      name: 'feature',
      message: 'Would you like to feature this project?',
      default: false
    },
    {
      type: 'confirm',
      name: 'confirmAddProject',
      message: 'Would you like to enter another project?',
      default: false
    }
  ]).then(projectData => {
    portfolioData.projects.push(projectData);
    if (projectData.confirmAddProject) {
      return promptProject(portfolioData);
    } else {
      return portfolioData;
    }
  });
};

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
