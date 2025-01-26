import { useState } from "react";
import { _axios } from "../lib/axios";

export default function CreateBlog({ setBlogCreateMode }) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let res = await _axios.post("/blog", formData);

      if (res.data.status) {
        alert("Blog created successfully");
        setFormData({
          title: "",
          content: "",
        });
        setBlogCreateMode(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h3>Create Blog</h3>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label> <br />
          <input
            type="text"
            name="title"
            required
            onChange={handleChange}
            value={formData.title}
          />
        </div>{" "}
        <br />
        <div>
          <label htmlFor="content">Content</label> <br />
          <textarea
            name="content"
            required
            onChange={handleChange}
            value={formData.content}
          />
        </div>{" "}
        <br />
        <button type="submit">Submit</button> <br />
      </form>
    </div>
  );
}
