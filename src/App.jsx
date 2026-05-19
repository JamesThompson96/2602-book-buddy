import Layout from "./layout/layout";
import Register from "./auth/register";
import Login from "./auth/login";
import { Routes, Route } from "react-router-dom";
import BooksPage from "./tabs/BooksPage";
import BookDetails from "./tabs/BookDetails";
import Error404 from "./Error404";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<BooksPage />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/books/:id" element={<BookDetails />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  );
}
