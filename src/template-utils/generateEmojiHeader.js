// Utility function to generate an HTML string for an Emoji Header.

// Example Usage:
// const emojiHeader = generateEmojiHeader('<i class="fas fa-comment-dots"></i>');
// Output: '<i class="fas fa-comment-dots"></i>'

export const generateEmojiHeader = emojiHeader => {
    // Ensures that a valid HTML snippet is returned if the input is non-empty
    // If the input is empty, it handles the case by returning an empty string.
    if (!emojiHeader) {
      return '';
    }
  
    return `${emojiHeader}`;
};