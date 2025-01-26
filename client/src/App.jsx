import { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import GlobalContext from "./context/GlobalContext";
import HomePage from "./pages/homepage";
import LoginPage from "./pages/loginpage";
import RegisterPage from "./pages/registerpage";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");

    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <div>
      <GlobalContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </GlobalContext.Provider>
    </div>
  );
}

export default App;
