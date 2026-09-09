import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import Sidebar from "./components/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute";

import DashboardPage from "./pages/DashboardPage";
import MyTicketsPage from "./pages/MyTicketsPage";
import CreateTicketPage from "./pages/CreateTicketPage";
import TicketDetailsPage from "./pages/TicketDetailsPage";
import LoginPage from "./pages/LoginPage";

import "./App.css";

function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="app">
        <Sidebar />
        {children}
      </div>
    </ProtectedRoute>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/"
          element={
            <ProtectedLayout>
              <DashboardPage />
            </ProtectedLayout>
          }
        />

        <Route
          path="/tickets"
          element={
            <ProtectedLayout>
              <MyTicketsPage />
            </ProtectedLayout>
          }
        />

        <Route
          path="/tickets/:ticketId"
          element={
            <ProtectedLayout>
              <TicketDetailsPage />
            </ProtectedLayout>
          }
        />

        <Route
          path="/create-ticket"
          element={
            <ProtectedLayout>
              <CreateTicketPage />
            </ProtectedLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;