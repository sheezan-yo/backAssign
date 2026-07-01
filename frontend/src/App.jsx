import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { ToastContainer } from "react-toastify";
import AdminDashboard from "./pages/AdminDashboard";

function AdminRoute({ children }) {
  const token = localStorage.getItem("token");
  const userString = localStorage.getItem("user");

  if(!token || !userString) {
    return <Navigate to="/login" />;
  }

  const user = JSON.parse(userString);

  if(user.role !== "admin"){
    return <Navigate to="/dashboard" />
  }

  return children;
}

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");

  return token ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
    </BrowserRouter>
  );
}

export default App;
