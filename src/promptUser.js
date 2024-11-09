// Importing inquirer
import inquirer from 'inquirer';

// Function to prompt the user for information they wish to include
export const promptUser = () => {
  console.log(`
  ================================
  Thanks for using PortfolioForge!
  ================================
  `);

  console.log(`
    First lets start with a few questions.
    --------------------------------------
  `);

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
      when: ({ confirmLanguages }) => confirmLanguages,
      validate: (input) => input.length > 0 || 'Please select at least one language.'
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
      name: 'confirmContact',
      message: 'Do you want to include a Contact / Reach Out section?',
      default: true,
      validate: ({ confirmContact }) => {
        if (confirmContact) {
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