import { useState } from "react";
import { useNavigate } from "react-router";
import { _axios } from "../lib/axios";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  async function handleRegister(e) {
    e.preventDefault();

    try {
      const res = await _axios.post("/user/register", formData);

      if (res.data.status) {
        alert("Registration successful. Please login.");
        window.location.href = "/login";
      } else {
        alert(res.data.message || "Registration failed.");
      }
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Something went wrong!");
    }
  }

  return (
    <div>
      <h1>Register Page</h1>
      <form onSubmit={handleRegister}>
        <div>
          <label htmlFor="name">Name</label> <br />
          <input
            type="text"
            name="name"
            required
            onChange={handleChange}
            value={formData.name}
          />
        </div>{" "}
        <br />
        <div>
          <label htmlFor="email">Email</label> <br />
          <input
            type="email"
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
        <button type="submit">Register</button>
        <button type="button" onClick={() => navigate("/login")}>
          Login
        </button>
      </form>
    </div>
  );
}
