// This file contains an object collection of the various color-themes available to the project.
// selectColorTheme will return a default theme, but based on the fileName selected will return the appropriate css file

// Mapping object for colorTheme
export const colorThemeMapping = {
    "Default": "default.css",
    "Deep Lavender & Charcoal": "deep-lavender.css",
    "Dusk Pink & Slate Gray": "dusk-pink.css",
    "Darker Pastel Plum & Teal": "darker-pastel.css",
    "Gentle Peach & Lilac": "gentle-peach.css",
    "Serenity": "serenity.css",
    "Soothing Lavender & Mint": "lavender-mint.css",
    "Blue & Silver": "blue-silver.css",
    "Soft Pastel Delight": "soft-pastel.css",
    "Muted Earth Tones": "earth-tones.css"
};
  
// Select style.css based off of user choice
export const selectColorTheme = cssFileName => {
    if (!cssFileName || !colorThemeMapping[cssFileName]) {
      // Use the default.css file
      cssFileName = 'default.css';
    }
  
    const selectedColorTheme = colorThemeMapping[cssFileName];
  
    // Otherwise, return HTML with appropriate data
    return `
      <link rel="stylesheet" href="${selectedColorTheme}">
    `;
};