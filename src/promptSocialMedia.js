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
};