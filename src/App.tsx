import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import DashboardPage from "./pages/DashboardPage";
import CreateTicketPage from "./pages/CreateTicketPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Sidebar />

        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/create-ticket" element={<CreateTicketPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;