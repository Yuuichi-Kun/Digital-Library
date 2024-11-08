import { LibraryController } from "./controllers/LibraryController.js";
import { BookForm } from "./views/BookForm.js";
import { BookList } from "./views/BookList.js";

// Tambahkan elemen search input
const searchInput = document.getElementById("search-input");

const bookForm = new BookForm();
const bookList = new BookList();
const libraryController = new LibraryController(
  bookForm,
  bookList,
  searchInput
);

bookForm.render(libraryController.addBook.bind(libraryController));
bookList.render(
  libraryController.books,
  libraryController.deleteBook.bind(libraryController),
  libraryController.editBook.bind(libraryController)
);

document
  .getElementById("theme-toggle")
  .addEventListener(
    "click",
    libraryController.toggleTheme.bind(libraryController)
  );
libraryController.initTheme();
