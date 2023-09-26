// Importing inquirer
import inquirer from 'inquirer';

// Function to prompt users if they'd like to include social media links
export const promptSocialMedia = async (portfolioData) => {
  console.log(`
    ==================
    Social Media Links
    ==================
  `);

  if (!portfolioData.socialMediaLinks) {
    portfolioData.socialMediaLinks = [];
  }

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
  ];
  
  // Function to prompt for specific social media platforms
  const promptSocialMediaPlatform = async (platform) => {
    const answer = await inquirer.prompt({
      type: 'confirm',
      name: platform.key,
      message: `Would you like to include a ${platform.name} link?`,
      default: true,
    });

    if (answer[platform.key]) {
      const usernameAnswer = await inquirer.prompt({
        type: 'input',
        name: platform.key,
        message: `Enter your ${platform.name} username`,
      });

      if (usernameAnswer[platform.key]) {
        portfolioData.socialMediaLinks.push({
          platform: platform.name,
          username: usernameAnswer[platform.key],
        });
      }
    }
  };

  // Prompt user for each social media link
  for (const platform of socialMediaPlatforms) {
    await promptSocialMediaPlatform(platform);
  }

  return portfolioData;


  // .then(async answers => {
  //   // Prompt for usernames and store them in the socialMediaLinks array. Start with For Each
  //   for (const platform of socialMediaPlatforms) {
  //     if (answers[platform.key]) {
  //       const usernameAnswer = await inquirer.prompt({
  //         type: 'input',
  //         name: platform.key,
  //         message: `Enter your ${platform.name} username`,
  //       });
  //       if (usernameAnswer[platform.key]) {
  //         socialMediaLinks.push({
  //           platform: platform.name,
  //           username: usernameAnswer[platform.key],
  //         });
  //       }
  //     }
  //   }

  //   // Store the social media links in portfolioData 
  //   portfolioData.socialMediaLinks = socialMediaLinks;

  //   return portfolioData;
  // });
};