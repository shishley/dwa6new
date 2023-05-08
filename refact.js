import { books, authors, genres, BOOKS_PER_PAGE } from "./data.js";
// initial page and book matches
let page = 1;
let matches = books;

// Generate and append preview elements for the initial page
const starting = generatePreviewElements(matches.slice(0, BOOKS_PER_PAGE));
document.querySelector("[data-list-items]").appendChild(starting);

// Generate and append genre options to search dropdown
const genreOptions = generateGenreOptions(genres);
document.querySelector("[data-search-genres]").appendChild(genreOptions);

// Generate and append author options to search dropdown
const authorOptions = generateAuthorOptions(authors);
document.querySelector("[data-search-authors]").appendChild(authorOptions);

// Set page theme based on user preference or default
setTheme();
updateListButtonMessage(matches.length);

/**
 * Set page theme based on user preference or default
 */
setTheme = () => {
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    document.querySelector("[data-settings-theme]").value = "night";
    document.documentElement.style.setProperty("--color-dark", "255, 255, 255");
    document.documentElement.style.setProperty("--color-light", "10, 10, 20");
  } else {
    document.querySelector("[data-settings-theme]").value = "day";
    document.documentElement.style.setProperty("--color-dark", "10, 10, 20");
    document.documentElement.style.setProperty(
      "--color-light",
      "255, 255, 255"
    );
  }
};
/**
 * Generate a document fragment of preview elements
 * @param {Array} books - Array of book objects
 * @returns {DocumentFragment} - Document fragment containing
 *  preview elements
 */
generatePreviewElements = (books) => {
  const fragment = document.createDocumentFragment();
  for (const { author, id, image, title } of books) {
    const element = generatePreviewElement({ author, id, image, title });
    fragment.appendChild(element);
  }
  return fragment;
};

/**
 * Generate a single preview element
 * @param {Object} book - Book object containing author, id, image, and title properties
 * @returns {HTMLButtonElement} - Button element with preview HTML content
 */
generatePreviewElement = ({ author, id, image, title }) => {
  const element = document.createElement("button");
  element.classList = "preview";
  element.setAttribute("data-preview", id);
  // preview element's HTML content
  element.innerHTML = `<img class="preview__image" src="${image}" />
    <div class="preview__info">
      <h3 class="preview__title">${title}</h3>
      <div class="preview__author">${authors[author]}</div>
    </div>`;

  return element;
};

/**
 * Generate a document fragment of genre options
 * @param {Object} genres - Object containing genre IDs and names
 * @returns {DocumentFragment} - Document fragment containing genre option elements
 */
generateGenreOptions = (genres) => {
  const fragment = document.createDocumentFragment();

  // Add a default 'All Genres' option
  const firstGenreElement = generateGenreOption("any", "All Genres");
  fragment.appendChild(firstGenreElement);

  // Add an option for each genre in the genres object
  for (const [id, name] of Object.entries(genres)) {
    fragment.appendChild(generateGenreOption(id, name));
  }

  return fragment;
};

generateGenreOption = (id, name) => {
  const element = document.createElement("option");
  element.value = id;
  element.innerText = name;
  return element;
};

generateAuthorOptions = (authors) => {
  const fragment = document.createDocumentFragment();
  const firstAuthorElement = generateAuthorOption("any", "All Authors");
  fragment.appendChild(firstAuthorElement);

  for (const [id, name] of Object.entries(authors)) {
    fragment.appendChild(generateAuthorOption(id, name));
  }

  return fragment;
};

generateAuthorOption = (id, name) => {
  const element = document.createElement("option");
  element.value = id;
  element.innerText = name;
  return element;
};

updateListButtonMessage = (count) => {
  document.querySelector(
    "[data-list-button]"
  ).innerHTML = `<span>Show more</span> <span class="list__remaining">${
    count > 0 ? count : 0
  }</span>`;
};
