import { useContext } from "react";
import { AuthContext } from "../contexts/auth";
import { Link, useNavigate } from "react-router-dom";

export function Header() {
  const { user, isAuthenticated, signOut } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <header className="h-12 sticky top-0 w-full bg-[#180434] flex flex-row px-20 items-center z-10">
      <div
        className="sm:flex hidden flex-row text-sm gap-5 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img
          src="https://quiker.com.br/wp-content/uploads/2024/09/Logo-Quiker-Alta-Negativo-Claro-300x66.png"
          alt=""
          width={200}
        />
      </div>
      <div className="flex w-full justify-end text-white">
        {isAuthenticated && user ? (
          <div className="flex items-center space-x-4">
            <span>Welcome, {user.name}</span>
            <Link to="/perfil" className="cursor-pointer hover:opacity-65">
              Profile
            </Link>
            <button onClick={signOut} className="cursor-pointer hover:opacity-65">
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="cursor-pointer">
            Login
          </Link>
        )}
      </div>
    </header>
  );
}
