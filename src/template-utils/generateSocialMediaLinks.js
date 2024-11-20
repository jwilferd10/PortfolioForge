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
        <a class="socialLinks ml-2 my-1 px-2 py-1 bg-secondary text-dark d-flex align-items-center" href="${url}">
          <i class="socialIcon fab fa-${platform} fa-2x"></i>
        </a>
      `;
    }).join('');
};