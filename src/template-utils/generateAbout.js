import { emojiMapping } from "./emojiMapping.js";
import { generateEmojiHeader } from "./generateEmojiHeader.js";

// User About Section
export const generateAbout = (aboutTextArr, emojis) => {
    if (!aboutTextArr || aboutTextArr.length === 0) {
      return '';
    }
  
    const emojiType = emojis ? emojiMapping.comment : '';
    const emojiHeader = generateEmojiHeader(emojiType);
  
    const aboutMeText = aboutTextArr.map(({ aboutText }) => {
      return `
        <p>${aboutText}</p>
      `;
    }).join(' ');
  
    return `
      <section class="my-3" id="about">
        <h2 class="text-dark bg-primary p-2 display-inline-block rounded-edges1 box-shadow1 px-3 mb-3">
          ${emojiHeader} About Me
        </h2>
        <section class="my-3 aboutText">
          ${aboutMeText}
        </section>
      </section>
    `;
};
  