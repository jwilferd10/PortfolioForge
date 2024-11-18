import { emojiMapping } from "./emojiMapping.js";
import { generateEmojiHeader } from "./generateEmojiHeader.js";

// Programming Languages
export const generateLanguageSpread = (languageSpread, emojis) => {
    // Return an empty string if there are no languages provided or the array is empty
    if (!languageSpread || languageSpread.length === 0) {
      return '';
    }
  
    const emojiType = emojis ? emojiMapping.database : '';
    const emojiHeader = generateEmojiHeader(emojiType);
  
    return `
      <section class="my-3" id="programmingLanguages">
        <h2 class="text-dark bg-primary p-2 display-inline-block rounded-edges1 box-shadow1 px-3 mb-3">
          ${emojiHeader} Programming Languages
        </h2>
        <p>${languageSpread.join(', ')}</p>
      </section>
    `;
};
  