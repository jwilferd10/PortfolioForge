// Importing inquirer
import inquirer from 'inquirer';

// Function to prompt the user for project information
export const promptProject = async (portfolioData) => {
  if (!portfolioData.projects) {
    portfolioData.projects = [];
  } 
  
  console.log(`
    =================
    Add a New Project
    =================
  `);
  
  console.log(`
    Showcasing your projects is an imperative for any field.
    --------------------------------------------------------
  `)
  
  // Project Name, Descrpition, Structural Languages, Link, Feature
  const projectQuestions = [
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of your project?',
      validate: nameInput => nameInput ? true : "Please enter your project's name!",
    },
    {
      type: 'input',
      name: 'description',
      message: 'Provide a description of the project (Required)',
      validate: descriptionInput => descriptionInput ? true : 'Please provide a project description!',
    },
    {
      type: 'checkbox',
      name: 'languages',
      message: 'What did you build this project with? (Check all that apply)',
      choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node.js', 'Python', 'Java', 'Ruby', 'C++', 'PHP', 'Swift', 'TypeScript', 'Go', 'Rust', 'Kotlin', 'SQL', 'Perl', 'C#', 'Dart', 'Scala', 'Haskell', 'Objective-C', 'Lua'],
    },
    {
      type: 'input',
      name: 'link',
      message: 'Enter the GitHub link to your project. (Required)',
      validate: linkInput => linkInput ? true : "You need to enter a GitHub link for your project!",
    },
    {
      type: 'confirm',
      name: 'feature',
      message: 'Would you like to feature this project?',
      default: true,
    },
    {
      type: 'confirm',
      name: 'confirmAddProject',
      message: 'Would you like to enter another project?',
      default: false,
    }
  ];

  while (true) {
    // projectData collects inquirer prompt data from projectQuestions.
    const projectData = await inquirer.prompt(projectQuestions);
    portfolioData.projects.push(projectData);

    // If the user doesn't want to add another project, exit the loop.
    if (!projectData.confirmAddProject) {
      break;
    }
  }

  return portfolioData;
};