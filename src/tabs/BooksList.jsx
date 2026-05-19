import { Link } from "react-router-dom";

export default function BookList({ books = [] }) {
  if (books.length === 0) {
    return <p>Loading book catalog...</p>;
  }
  return (
    <ul>
      {books.map((book) => (
        <BookListItem key={book.id} book={book} />
      ))}
    </ul>
  );
}

function BookListItem({ book }) {
  return (
    <li>
      <Link to={"/books/" + book.id}>{book.title}</Link>
    </li>
  );
}
