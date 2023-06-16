import { Navigate, Route, Routes } from "react-router-dom";
import Todo from "./scenes/Todo";
import Login from "./scenes/Login";
import RegisterPage from "./scenes/Register/Register";
import { AuthProvider } from "./components/AuthContext";

const App = () => {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login></Login>} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/todo" element={<Todo></Todo>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </>
  );
};

export default App;
