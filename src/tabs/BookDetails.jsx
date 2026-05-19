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
      } catch (err) {
        setError("Failed to fetch book details.");
        console.error(err);
      }
    };
    syncBook();
  }, [id]);

  // Handle error states cleanly
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  // Safely wait until the book state is populated
  if (!book) return <p>Loading book details...</p>;

  return (
    <article>
      {/* 💡 Note: If the API properties are lowercase, adjust these to match (e.g., book.title, book.author) */}
      <h1>{book.title || book.name}</h1>
      <h3>By {book.author}</h3>
      <p>{book.description}</p>

      {book.coverimage && (
        <img
          src={book.coverimage}
          alt={`Cover of ${book.title || book.name}`}
          width="200"
        />
      )}
    </article>
  );
}
