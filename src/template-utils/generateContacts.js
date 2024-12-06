import { emojiMapping } from "./emojiMapping.js";
import { generateEmojiHeader } from "./generateEmojiHeader.js";

// Generate necessary html for the contact page
export const generateContact = (contactInfoArr, emojis) => {
  if (!contactInfoArr || contactInfoArr.length === 0) {
    return '';
  }

  const emojiType = emojis ? emojiMapping.mail : '';
  const emojiHeader = generateEmojiHeader(emojiType);

  const contactText = contactInfoArr.map(({ contactInfo }) => {
    return `
      <li class="mx-2">${contactInfo}</li>
    `;
  }).join(' ');

  return `
    <section class="my-3" id="contact">
      <h2 class="text-dark bg-primary p-2 display-inline-block rounded-edges1 box-shadow1 px-3 mb-3">
        ${emojiHeader} Reach Out
      </h2>
      <section class="my-3 aboutText">
        <section class="container text-center contact-list">
          <h3>Contact Info</h3>
          <ul class="flex-row justify-center pl-0" >
            ${contactText}
          </ul>
        </section>
        
        <form class="container">
          <label for="name" class="form-label">Name</label>
          <input type="text" placeholder="Name" class="form-input" required/>
          <label for="email" class="form-label">Email</label>
          <input type="text" placeholder="Email" class="form-input" required/>
          <label for="message" class="form-label">Message</label>
          <input type="Message" placeholder="Message" class="form-input" required/>
          <button class="btn">Submit</button>
      </form>
      </section>
    </section>
  `;
};
  