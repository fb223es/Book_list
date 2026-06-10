import BookCard from "../components/BookCard";
import { useState } from "react";

type Book = {
  book_title: string;
  book_image: string;
  author_id: number;
  rating: number;
};

function Start() {
  const [searchInput, setSearchInput] = useState("");

  const Books: Book[] = [
    {
      book_title: "The Silent Patient",
      book_image: "https://via.placeholder.com/150",
      author_id: 1,
      rating: 3,
    },
    {
      book_title: "1984",
      book_image: "https://via.placeholder.com/150",
      author_id: 2,
      rating: 2,
    },
    {
      book_title: "The Hobbit",
      book_image: "https://via.placeholder.com/150",
      author_id: 3,
      rating: 3,
    },
  ];

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    alert(searchInput);
  }

  const filteredBooks = Books.filter((book) =>
    book.book_title.toLowerCase().startsWith(searchInput.toLowerCase())
  );

  return (
    <>
      <form onSubmit={handleSearch} className="search">
        <input
          type="text"
          placeholder="Sök på en titel eller författare..."
          className="searchInput"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />

        <button type="submit" className="searchBtn">
          Sök!
        </button>
      </form>

      <div className="start">
        <div className="bookGrid">
          {filteredBooks.map((book, index) => (
            <BookCard book={book} key={index} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Start;