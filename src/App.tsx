import { Navigate, Route, Routes } from "react-router-dom";
import Todo from "./scenes/Todo";
import Login from "./scenes/Login";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login></Login>} />
        <Route path="/todo" element={<Todo></Todo>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default App;
