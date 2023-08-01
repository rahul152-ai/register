import "./App.css";
import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import ShowUser from "./pages/ShowUser";
import UpdateProfile from "./pages/UpdateProfile";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user" element={<ShowUser />} />
        <Route path="/update" element={<UpdateProfile />} />
      </Routes>
    </>
  );
}

export default App;
