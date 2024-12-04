import { useState, useContext } from "react";
import { AuthContext } from "../contexts/auth";
import { IoEye, IoEyeOff } from "react-icons/io5";

interface ApiResponse {
  message: string;
}

export function RegisterPage() {
  const { registerNewUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      registerNewUser(email, password, name);
    } catch (error) {
      if (error instanceof Error) {
        const axiosError = error as { response?: { data?: ApiResponse } };
        console.error(
          `${"Erro ao registrar usuário: "}${
            axiosError?.response?.data?.message
          }`
        );
      } else {
        console.error("Erro ao registrar usuário: ");
      }
    }
  };

  return (
    <div className="flex-1 w-full flex justify-center items-center">
      <form
        onSubmit={handleRegister}
        className="border rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="text-center mb-3 font-extrabold text-xl">
          Preencha o Formulário
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="name">
            Nome
          </label>
          <input
            id="name"
            type="name"
            required
            className="border w-full rounded py-1 px-1"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          Cadastrar Usuário
        </button>
      </form>
    </div>
  );
}
