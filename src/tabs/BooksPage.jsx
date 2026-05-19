import { useEffect, useState } from "react";
import { getBooks } from "../Components/Books";
import { useAuth } from "../auth/AuthContext";

import BookList from "./BooksList";

export default function BooksPage() {
  const { token } = useAuth();

  const [books, setBooks] = useState([]);

  const syncBooks = async () => {
    try {
      console.log("1. syncBooks is running...");
      const data = await getBooks();
      console.log("2. Data returned from getBooks:", data);
      setBooks(data);
    } catch (e) {
      console.error("3. error inside syncBooks:", error);
    }
  };

  useEffect(() => {
    syncBooks();
  }, []);

  return (
    <>
      <h1>Catalog</h1>
      <BookList books={books} />
    </>
  );
}
