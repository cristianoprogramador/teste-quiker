import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./contexts/auth";
import { Header } from "./components/header";
import { LoginPage } from "./pages/login";
import { RegisterPage } from "./pages/register";
import { ProfilePage } from "./pages/profile";
import { HomePage } from "./pages/home";

function App() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 w-full flex flex-col">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/login"
              element={
                isAuthenticated ? <Navigate to="/" /> : <LoginPage />
              }
            />
            <Route
              path="/registrar"
              element={
                isAuthenticated ? <Navigate to="/" /> : <RegisterPage />
              }
            />
            <Route
              path="/perfil"
              element={
                isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />
              }
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
