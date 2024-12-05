import { emojiMapping } from "./emojiMapping.js";
import { generateEmojiHeader } from "./generateEmojiHeader.js";

// Generate HTML cards for user achievements
export const generateAchievements = (achievementArr, emojis) => {
  // Check if the array is defined and is an array, return empty string if not.
  if (!achievementArr || achievementArr.length === 0) {
    return '';
  }

  const emojiType = emojis ? emojiMapping.book : '';
  const emojiHeader = generateEmojiHeader(emojiType);

  const featuredAchievements = achievementArr.map(({ achievementName, achievementDescription }) => {
    return `
      <article class="col-12 mb-2 bg-dark text-light p-3 rounded-edges2 box-shadow2">
        <h3 class="portfolio-item-title text-light">${achievementName}</h3>
        <h4 class="portfolio-languages">${achievementDescription}</h4>
      </article>
    `;
  }).join(' ');

  if (featuredAchievements.length === 0) {
    // Return an empty string if there are no featured achievegments
    return '';
  }

  return `
    <section class="my-3" id="achievements">
      <h2 class="text-dark bg-primary p-2 display-inline-block rounded-edges1 box-shadow1 mb-3 px-3 target1">
        ${emojiHeader} Education & Achievements
      </h2>
      <section class="flex-row justify-space-between">
        ${featuredAchievements}
      </section>
    </section>
  `;
};
  