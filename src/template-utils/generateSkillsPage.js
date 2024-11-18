import { emojiMapping } from "./emojiMapping.js";
import { generateEmojiHeader } from "./generateEmojiHeader.js";

// User Skills Section
export const generateSkillsPage = (skillsTextArr, emojis) => {
    if (!skillsTextArr || skillsTextArr.length === 0) {
      return '';
    }
  
    const emojiType = emojis ? emojiMapping.tools : '';
    const emojiHeader = generateEmojiHeader(emojiType);
  
    const skillsContent = skillsTextArr.map(({ skillsText }) => {
      return `
        <p>${skillsText}</p>
      `;
    }).join(' ');
  
    return `
      <section class="my-3" id="skills">
        <h2 class="text-dark bg-primary p-2 display-inline-block rounded-edges1 box-shadow1 px-3 mb-3">
          ${emojiHeader} Skills
        </h2>
        <p>${skillsContent}</p>
      </section>
    `;
};
  