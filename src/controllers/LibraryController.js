import { Book } from "../models/Book.js";
import { showAlert } from "../utils/alert.js";

export class LibraryController {
  constructor(bookForm, bookList, searchInput) {
    this.books = JSON.parse(localStorage.getItem("books")) || [];
    this.bookForm = bookForm;
    this.bookList = bookList;
    this.searchInput = searchInput;

    // Tambahkan event listener untuk pencarian
    if (this.searchInput) {
      this.searchInput.addEventListener("input", (e) => {
        this.searchBooks(e.target.value);
      });
    }
  }

  // Method pencarian buku
  searchBooks(query) {
    // Konversi query ke lowercase untuk pencarian case-insensitive
    const lowercaseQuery = query.toLowerCase().trim();

    // Filter buku berdasarkan judul atau penulis
    const filteredBooks = this.books.filter(
      (book) =>
        book.title.toLowerCase().includes(lowercaseQuery) ||
        book.author.toLowerCase().includes(lowercaseQuery)
    );

    // Render daftar buku yang sesuai
    this.bookList.render(
      filteredBooks,
      this.deleteBook.bind(this),
      this.editBook.bind(this)
    );
  }

  addBook(bookData) {
    const newBook = new Book(
      Date.now(),
      bookData.title,
      bookData.author,
      bookData.year
    );
    this.books.push(newBook);
    this.saveAndRender();
    showAlert("success", "Buku berhasil ditambahkan");
  }

  editBook(id) {
    id = parseInt(id);
    const book = this.books.find((b) => b.id === id);
    if (book) {
      this.bookForm.render((updatedBook) => {
        const index = this.books.findIndex((b) => b.id === id);
        this.books[index] = { ...updatedBook, id };
        this.saveAndRender();
        showAlert("success", "Buku berhasil diperbarui");
      });
      this.bookForm.fillForm(book);
    }
  }

  deleteBook(id) {
    id = parseInt(id);
    this.books = this.books.filter((b) => b.id !== id);
    this.saveAndRender();
    showAlert("warning", "Buku berhasil dihapus!");
  }

  saveAndRender() {
    localStorage.setItem("books", JSON.stringify(this.books));
    this.bookList.render(
      this.books,
      this.deleteBook.bind(this),
      this.editBook.bind(this)
    );
  }

  toggleTheme() {
    const currentTheme = document.body.classList.contains("theme-dark")
      ? "dark"
      : "light";
    document.body.classList.toggle("theme-dark", currentTheme === "light");
    document.body.classList.toggle("theme-light", currentTheme === "dark");
    localStorage.setItem("theme", currentTheme === "light" ? "dark" : "light");
    this.updateThemeIcon();
  }

  updateThemeIcon() {
    const themeIcon = document.getElementById("theme-icon");
    const isDarkTheme = document.body.classList.contains("theme-dark");
    themeIcon.classList.toggle("bi-sun-fill", isDarkTheme);
    themeIcon.classList.toggle("bi-moon-fill", !isDarkTheme);
  }

  initTheme() {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.body.classList.toggle("theme-dark", savedTheme === "dark");
    document.body.classList.toggle("theme-light", savedTheme === "light");
    this.updateThemeIcon();
  }
}
