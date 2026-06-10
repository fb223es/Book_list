import "../css/BookCard.css"

type Book = {
  book_title: string;
  book_image: string;
  author_id: number;
  rating: number;
};

type Props = {
  book: Book;
};

function BookCard({ book }: Props) {
  function displayMore() {
    alert("Skulle kommit upp mer info!  " + book.book_title);
  }

  return (
    <div className="book-card" onClick={displayMore}>
      <img src={book.book_image} alt={book.book_title} />
      <h1>{book.book_title}</h1>
      <h2>Författare: {book.author_id}</h2>
    <h3>{"★".repeat(book.rating)}</h3>
    </div>
  );
}
export default BookCard