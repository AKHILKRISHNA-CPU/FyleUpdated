import "./App.css";
import Home from "./components/mainPage/main";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import User from "./components/RepoPage/RepoPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/:login" element={<User />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
