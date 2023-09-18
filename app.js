// Importing necessary modules
import inquirer from 'inquirer';
import { writeFile, copyGenericCSSFile } from './utils/generate-site.js';
import { generatePage } from './src/page-template.js';
import { clearDistDirectory } from './utils/clearDistDirectory.js';

// Function to prompt the user for information
const promptUser = () => {
  return inquirer.prompt([
    // Prompt for user's name
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
    // Prompt for user's GitHub username
    {
      type: 'input',
      name: 'github',
      message: 'Enter your GitHub username',
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('Please enter your GitHub Username');
          return false;
        }
      }
    },
    // Prompt for About section
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
    // User input for About section
    {
      type: 'input',
      name: 'about',
      message: 'Provide some information about yourself:',
      when: ({ confirmAbout }) => confirmAbout
    },
    // Prompt for Skills section
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
    // User input for Skills section
    {
      type: 'input',
      name: 'skills',
      message: 'Provide some details about your skillset:',
      when: ({ confirmSkills }) => confirmSkills
    },
    // Prompt users to highlight their known programming languages
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
    // Checkbox a variety of languages user's must choose from
    {
      type: 'checkbox',
      name: 'codingLanguages',
      message: 'What languages would you like to include?',
      choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node.js', 'Python', 'Java', 'Ruby', 'C++', 'PHP', 'Swift', 'TypeScript', 'Go', 'Rust', 'Kotlin', 'SQL', 'Perl', 'C#', 'Dart', 'Scala', 'Haskell', 'Objective-C', 'Lua'],
      when: ({ confirmLanguages }) => confirmLanguages
    },
    // Prompt user to include any information about their education
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
    // Prompt user to pick a style for their portfolio
    {
      type: 'rawlist',
      name: 'colorTheme',
      message: 'Pick a color theme for your portfolio.',
      choices: ["Default", "Deep Lavender & Charcoal", "Dusk Pink & Slate Gray", "Darker Pastel Plum & Teal", "Gentle Peach & Lilac", "Serenity", "Soothing Lavender & Mint", "Blue & Silver", "Soft Pastel Delight", "Muted Earth Tones"],
      default: 0,
    }
  ])
  .then(userResponses => {
    // Check if user wants to include Education/Certifications
    if (userResponses.confirmEducation) {
      // Call promptEducation and pass portfolioData
      return promptEducation(userResponses).then(educationData => ({
        ...userResponses,
        educationData
      }));
    }
    return userResponses;
  })
};

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

  return inquirer.prompt([
    // Name of Education and Certification
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
    // Achievement Description
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

  return inquirer.prompt([
    // Project Name
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
    // Project Description
    {
      type: 'input',
      name: 'description',
      message: 'Provide a description of the project (Required)'
    },
    // Project's Structural Languages
    {
      type: 'checkbox',
      name: 'languages',
      message: 'What did you build this project with? (Check all that apply)',
      choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node'] 
    },
    // Project link to GitHub
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
    // Confirm feature
    {
      type: 'confirm',
      name: 'feature',
      message: 'Would you like to feature this project?',
      default: false
    },
    // Confirm add another project
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
