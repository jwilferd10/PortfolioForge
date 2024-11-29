// Generate Social Media HTML
export const generataSocialMediaLinksHTML = (socialMediaData) => {
    if (!socialMediaData || socialMediaData.length === 0) {
      return '';
    }
  
    return socialMediaData.map(socialMediaLink => {
      const platform = socialMediaLink.platform.toLowerCase();
      const username = socialMediaLink.username;
  
      // construct the URL based on thhe platform and username
      const url = `https://${platform}.com/${username}`;
      
      return `
        <a class="ml-2 px-2 text-dark" href="${url}">
          <i class="socialIcon fab fa-${platform} fa-2x"></i>
        </a>
      `;
    }).join('');
};