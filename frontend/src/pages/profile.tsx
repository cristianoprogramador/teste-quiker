import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../contexts/auth";
import { api } from "../utils/api";

export function ProfilePage() {
  const { user, updateUser } = useContext(AuthContext);
  const [name, setName] = useState(user?.name || "");

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  if (!user) {
    return <div>Carregando...</div>;
  }

  const handleUpdateName = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.patch("/user/update-name", { name });
      const updatedUser = { ...user, name };
      updateUser(updatedUser);
      alert("Nome atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar nome:", error);
      alert("Não foi possível atualizar o nome.");
    }
  };

  return (
    <div className="flex-1 w-full flex justify-center items-center">
      <form
        onSubmit={handleUpdateName}
        className="border rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="text-center mb-3 font-extrabold text-xl">
          Atualizar Perfil
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="name">
            Nome
          </label>
          <input
            id="name"
            type="text"
            required
            className="border w-full rounded py-1 px-1"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <p>
            <strong>E-mail:</strong> {user.email}
          </p>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white w-full rounded py-2"
        >
          Atualizar Nome
        </button>
      </form>
    </div>
  );
}
