import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import SearchPage from "./components/SearchPage";
import Header from "./components/Header";

const App = () => {
  return (
    <div className="min-h-screen blue-background w-full">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </div>
  );
};

export default App;
