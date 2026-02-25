import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import VillagesPage from "./pages/VillagesPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="main-content">
        <div className="main-container">
          <Routes>
            <Route path="/" element={<VillagesPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </div>
      </main>
    </BrowserRouter>
  );
}

export default App;
