import { emojiMapping } from "./emojiMapping.js";
import { generateEmojiHeader } from "./generateEmojiHeader.js";

// Generate the HTML containing project data
export const generateProjects = (projectsArr, emojis) => {

    const emojiType = emojis ? emojiMapping.briefcase : '';
    const emojiHeader = generateEmojiHeader(emojiType);
  
    // In order: Featured and Non-Featured card templates
    return `
      <article class="my-3" id="portfolio">
        <h2 class="text-dark bg-primary p-2 display-inline-block rounded-edges1 box-shadow1 px-3 mb-3">
          ${emojiHeader} Work
        </h2>
        <section class="flex-row justify-space-between">
          ${projectsArr.filter(({ feature }) => feature).map(({ name, description, languages, link }) => {
            return `
              <article class="col-12 mb-2 bg-dark text-light p-3 rounded-edges2 box-shadow2 target1">
                <header class="text-center">
                  <h3 class="portfolio-item-title text-light">${name}</h3>
                  <h4 class="portfolio-languages">
                    Built With:
                    ${languages.join(', ')}
                  </h4>
                </header>
  
                <section>
                  <p>${description}</p>
                </section>
  
                <footer class="text-center"
                  <a href="${link}" class="btn">
                    <i class="fab fa-github mr-2"></i>
                    View Project on GitHub
                  </a>
                </footer>
              </article>
            `;
          }).join(' ')}
  
          ${projectsArr.filter(({ feature }) => !feature).map(({ name, description, languages, link }) => { 
            return `
              <article class="col-12 col-md-6 mb-2 bg-dark text-light p-3 flex-column rounded-edges2 box-shadow2">
                <header>
                  <h3 class="portfolio-item-title text-light">${name}</h3>
                  <h4 class="portfolio-languages">
                    Built With:
                    ${languages.join(', ')}
                  </h4>
                </header>
  
                <section>
                  <p>${description}</p>
                </section>
  
                <footer>
                  <a href="${link}" class="btn mt-auto">
                    <i class="fab fa-github mr-2"></i>
                    View Project on GitHub
                  </a>
                </footer>
              </article>
            `;
          }).join('')}
        </section>
      </article>
    `;
};
  