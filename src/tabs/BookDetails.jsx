import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { getBook } from "../Components/Books";
import { useAuth } from "../auth/AuthContext";

export default function BookDetails() {
  const { token } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const syncBook = async () => {
      try {
        const data = await getBook(id);
        if (!data) {
          setError("Book not found");
          return;
        }
        setBook(data);
      } catch (e) {
        setError("Failed to fetch book details.");
        console.error(e);
      }
    };
    syncBook();
  }, [id]);

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  if (!book) return <p>Loading book details...</p>;

  return (
    <article>
      <h1>{book.title}</h1>
      <h3>By {book.author}</h3>
      <p>{book.description}</p>
      {book.coverimage && (
        <img
          src={book.coverimage}
          alt={`Cover of ${book.title || book.name}`}
          width="200"
        />
      )}
      {token &&
        (book.available ? (
          <button>Reserve book</button>
        ) : (
          <button disabled>Book is already reserved</button>
        ))}
    </article>
  );
}
