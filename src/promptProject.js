// Importing inquirer
import inquirer from 'inquirer';

// Function to prompt the user for project information
export const promptProject = (portfolioData) => {
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