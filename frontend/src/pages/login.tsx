import { useState, useContext } from "react";
import { AuthContext } from "../contexts/auth";
import { useNavigate } from "react-router-dom";
import { IoEye, IoEyeOff } from "react-icons/io5";

export function LoginPage() {
  const { signInByEmail } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = await signInByEmail(email, password);
    if (user) {
      navigate("/");
    } else {
      alert("Credenciais Inválidas");
    }
  };

  return (
    <div className="flex-1 w-full flex justify-center items-center">
      <form
        onSubmit={handleLogin}
        className="border rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="text-center mb-3 font-extrabold text-xl">
          Faça login em sua conta
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="email">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            required
            className="border w-full rounded py-1 px-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4 relative">
          <label className="block text-sm font-bold mb-2" htmlFor="password">
            Senha
          </label>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            required
            className="border w-full rounded py-1 px-1 pr-8"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div
            className="absolute right-2 top-9 cursor-pointer"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? (
              <IoEye size={20} className="text-gray-600" />
            ) : (
              <IoEyeOff size={20} className="text-gray-600" />
            )}
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white w-full rounded py-2"
        >
          Login
        </button>
        <div className="flex justify-end mt-2 text-sm underline">
          <p
            className="hover:text-gray-600 cursor-pointer"
            onClick={() => navigate("/registrar")}
          >
            Cadastre-se
          </p>
        </div>
      </form>
    </div>
  );
}
