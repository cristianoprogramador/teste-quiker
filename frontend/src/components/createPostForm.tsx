import { useState } from "react";

type CreatePostFormProps = {
  onCreatePost: (title: string, description: string) => void;
  isAuthenticated: boolean;
};

export function CreatePostForm({
  onCreatePost,
  isAuthenticated,
}: CreatePostFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert("Você precisa estar logado para criar um post.");
      return;
    }

    if (title.trim() === "" || description.trim() === "") {
      alert("Título e descrição não podem ser vazios.");
      return;
    }

    onCreatePost(title, description);
    setTitle("");
    setDescription("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border rounded px-8 pt-6 pb-8 mb-4 w-full"
    >
      <div className="text-center mb-3 font-extrabold text-xl">
        Criar Novo Post
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2" htmlFor="title">
          Título
        </label>
        <input
          id="title"
          type="text"
          className="border w-full rounded py-1 px-1"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-bold mb-2" htmlFor="description">
          Descrição
        </label>
        <textarea
          id="description"
          className="border w-full rounded py-1 px-1"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white w-full rounded py-2"
      >
        Criar Post
      </button>
    </form>
  );
}
