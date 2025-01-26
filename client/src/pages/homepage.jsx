import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import CreateBlog from "../components/CreateBlog";
import { useGlobalContext } from "../context/GlobalContext";
import { useFetchData } from "../hooks/useFetchData";

export default function HomePage() {
  const [blogCreateMode, setBlogCreateMode] = useState(false);

  function formatedDate(date) {
    return new Date(date).toLocaleDateString();
  }

  const navigate = useNavigate();

  const { user, setUser } = useGlobalContext();

  const { data, error, loading } = useFetchData("/blog", "GET");

  const blogList = useMemo(() => {
    if (!data || !data.blogs) return null;
    return data.blogs.map((blog) => (
      <div key={blog._id}>
        <h3>{blog.title}</h3>
        <span>By {blog.author.name}</span>
        <span>On {formatedDate(blog.createdAt)}</span>
        <p>{blog.content}</p>
        {/* <button onClick={() => handleLike(blog._id)}>Like</button> */}
      </div>
    ));
  }, [data]);

  const handleLike = (blogId) => {
    console.log("Liked blog:", blogId);
  };

  function logout() {
    setUser(null);
    localStorage.clear();
    navigate("/login");
  }

  if (!user) {
    return (
      <div>
        <h3>Welcome Guest</h3>
        <button onClick={() => navigate("/login")}>Login</button>
        <button onClick={() => navigate("/register")}>Register</button>
      </div>
    );
  }

  return (
    <div>
      <div>
        <h3>Welcome {user.name}</h3>
        <h6> {user.email}</h6>
        <button
          onClick={() => {
            setBlogCreateMode(!blogCreateMode);
          }}
        >
          {!blogCreateMode ? "Create Blog" : "View Blogs"}
        </button>
        <button onClick={logout}>Logout</button>
      </div>

      {loading && <h3>Loading...</h3>}
      {error && <h3>Error: {error.message}</h3>}

      {blogCreateMode ? (
        <CreateBlog setBlogCreateMode={setBlogCreateMode} />
      ) : (
        <div>{blogList}</div>
      )}
    </div>
  );
}
