let searchfield = "";
const API_KEY = "AIzaSyDKZfTXVG1itTvPi1F7964Exqc5IR54MF8";
const apiUrl = (term) =>
  `https://www.googleapis.com/books/v1/volumes?q=${term}+${searchfield}&key=${API_KEY}`;

const searchInputEl = document.getElementById("search-input");
const selectEl = document.getElementById("field");
const searchButtonEl = document.getElementById("search-button");
const bookListEl = document.getElementById("book-list");

const handleFieldSelect = (e) => {
  searchfield = e.target.value;
  handleSearch();
};

const handleKeyPress = (e) => {
  if (e.keyCode === 13) {
    handleSearch();
  }
};

async function handleSearch() {
  const searchTerm = searchInputEl.value.replace(/ /g, "+");
  const books = await fetchBooks(searchTerm);
  renderBookList(books);
}

const fetchBooks = (term) => {
  return fetch(apiUrl(term))
    .then((response) => response.json())
    .then((data) => data.items);
};

const renderBookList = (books) => {
  bookListEl.innerHTML = "";
  if (!books) noBooksFound();
  const bookList = books.map((book) => book.volumeInfo);
  bookList.forEach((book) => createCard(book));
};

const noBooksFound = () => {
  const message = document.createElement("h1");
  message.innerHTML = `No books found with "${searchInputEl.value}" In this field.`;
  bookListEl.appendChild(message);
};

const createCard = (book) => {
  const card = document.createElement("div");
  const title = document.createElement("h4");
  const image = document.createElement("img");
  const description = document.createElement("div");
  const readMoreButton = document.createElement("button");

  card.className = "card";
  title.className = "title";
  image.className = "book-image";
  description.className = "description-short";
  readMoreButton.className = "read-more-button";

  title.innerHTML = book.title;
  image.src = book.imageLinks ? book.imageLinks.thumbnail : "";
  description.innerHTML = book.description
    ? book.description
    : "(no description)";

  readMoreButton.innerHTML = "More Details";
  readMoreButton.addEventListener("click", () => window.open(book.infoLink));

  card.appendChild(title);
  card.appendChild(image);
  card.appendChild(description);
  card.appendChild(readMoreButton);
  bookListEl.appendChild(card);
};

selectEl.addEventListener("change", handleFieldSelect);
searchButtonEl.addEventListener("click", handleSearch);
searchInputEl.addEventListener("keypress", handleKeyPress);
window.onload = () => handleSearch();
