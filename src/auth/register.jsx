import { useState } from "react";
import { Link, useNavigate } from "react-router";

import { useAuth } from "./AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState(null);

  const tryRegister = async (formData) => {
    setError(null);

    const email = formData.get("email");
    const password = formData.get("password");
    const firstname = formData.get("firstname");
    const lastname = formData.get("lastname");

    try {
      await register({ email, password, firstname, lastname });
      navigate("/books");
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <>
      <h1>Sign up here</h1>
      <form action={tryRegister}>
        <label>
          First Name
          <input type="text" name="firstname" required />
        </label>
        <label>
          Last Name
          <input type="text" name="lastname" required />
        </label>
        <label>
          Email
          <input type="text" name="email" required />
        </label>
        <label>
          Password
          <input type="password" name="password" required />
        </label>
        <button>Register</button>
        {error && <p role="alert">{error}</p>}
      </form>
      <Link to="/login">Already have an account? Login here.</Link>
    </>
  );
}
