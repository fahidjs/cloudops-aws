import Sidebar from "./components/Sidebar";
import DashboardPage from "./pages/DashboardPage";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Sidebar />
      <DashboardPage />
    </div>
  );
}

export default App;