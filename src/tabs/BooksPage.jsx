import { useEffect, useState } from "react";
import { getBooks } from "../Components/Books";
import { useAuth } from "../auth/AuthContext";

import BookList from "./BooksList";

export default function BooksPage() {
  const { token } = useAuth();

  const [books, setBooks] = useState([]);

  const syncBooks = async () => {
    const data = await getBooks();
    setBooks(data);
  };
}

useEffect(() => {
  syncBooks();
}, []);

return (
  <>
    <h1>Catalog</h1>
    <BookList books={books} />
  </>
);
