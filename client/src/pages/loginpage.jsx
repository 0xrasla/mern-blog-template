import { useState } from "react";
import { useNavigate } from "react-router";
import { useGlobalContext } from "../context/GlobalContext";
import { _axios } from "../lib/axios";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { setUser } = useGlobalContext();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const res = await _axios.post("/user/login", formData);

      if (res.data.status) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setUser(res.data.user);
        alert("Login successful");
        window.location.href = "/";
      } else {
        alert("Invalid email or password");
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  }

  return (
    <div>
      <h1>Login Page</h1>

      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email</label> <br />
          <input
            type="text"
            name="email"
            required
            onChange={handleChange}
            value={formData.email}
          />
        </div>{" "}
        <br />
        <div>
          <label htmlFor="password">Password</label> <br />
          <input
            type="password"
            name="password"
            required
            onChange={handleChange}
            value={formData.password}
          />
        </div>{" "}
        <br />
        <button type="submit">Login</button>
        <button type="button" onClick={() => navigate("/register")}>
          Register
        </button>
      </form>
    </div>
  );
}
