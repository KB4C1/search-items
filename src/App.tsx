import { Routes, Route } from "react-router";
import Header from "./components/Header";
import Home from "./components/pages/Home";
import Item from "./components/pages/Item";

export default function App() {
  return (
    <div className="app-container">
      <Header />
      <main>
        <Routes>
          <Route index element={<Home />} />
          <Route path="items/:id" element={<Item />} />
        </Routes>
      </main>
    </div>
  );
}
