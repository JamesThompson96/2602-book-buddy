import { NavLink } from "react-router";
import { useAuth } from "../auth/AuthContext";

export default function NavBar() {
  const { token, logout } = useAuth();
  return (
    <header>
      <p>Book Buddy</p>
      <nav>
        <NavLink to="/books">Books</NavLink>
        <NavLink to="/Login">Login</NavLink>
      </nav>
    </header>
  );
}
