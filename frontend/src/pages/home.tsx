import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/auth";
import { api } from "../utils/api";
import { Comment, Post } from "../types/types";
import { ListPosts } from "../components/listPosts";
import { CreatePostForm } from "../components/createPostForm";

export function HomePage() {
  const { user, isAuthenticated } = useContext(AuthContext);
  const [posts, setPosts] = useState<Post[]>([]);
  const [visiblePosts, setVisiblePosts] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [commentContents, setCommentContents] = useState<{
    [key: number]: string;
  }>({});

  useEffect(() => {
    fetchAllPosts();
  }, []);

  const fetchAllPosts = async () => {
    try {
      const response = await api.get("/posts");
      setPosts(response.data);
    } catch (error) {
      console.error("Erro ao buscar posts:", error);
    }
  };

  const onCreatePost = async (title: string, description: string) => {
    if (!isAuthenticated) {
      alert("Você precisa estar logado para criar um post.");
      return;
    }

    try {
      await api.post("/posts", { title, description });
      await fetchAllPosts();
    } catch (error) {
      console.error("Erro ao criar post:", error);
      alert("Não foi possível criar o post.");
    }
  };

  const handleDeleteComment = async (
    postId: number,
    commentId: number,
    deletedBy: "author" | "owner"
  ) => {
    if (window.confirm("Deseja realmente excluir este comentário?")) {
      await api.put(`/comments/${commentId}`, { deletedBy });

      setPosts((prevPosts) =>
        prevPosts.map((p) => {
          if (p.id === postId) {
            return {
              ...p,
              comments: p.comments.map((c) => {
                if (c.id === commentId) {
                  return {
                    ...c,
                    description: "",
                    deletedBy,
                  };
                }
                return c;
              }),
            };
          }
          return p;
        })
      );
    }
  };

  const handleAddComment = async (postId: number) => {
    const description = commentContents[postId];
    if (!description || description.trim() === "") {
      alert("Comentário não pode ser vazio.");
      return;
    }

    if (!user) {
      alert("Você precisa estar logado para comentar.");
      return;
    }

    const response = await api.post(`/comments`, {
      post_id: postId,
      description,
    });

    const newComment: Comment = {
      ...response.data,
      user_name: user.name,
    };

      setPosts((prevPosts) =>
        prevPosts.map((p) => {
          if (p.id === postId) {
            return {
              ...p,
              comments: [...p.comments, newComment],
            };
          }
          return p;
        })
      );

    setCommentContents((prevContents) => ({
      ...prevContents,
      [postId]: "",
    }));
  };

  const handleSetReaction = async (
    postId: number,
    reaction: "LIKE" | "DISLIKE"
  ) => {
    if (!isAuthenticated) {
      alert("Você precisa estar logado.");
      return;
    }

    try {
      await api.post(`/posts/${postId}/reaction`, {
        reaction_type: reaction,
      });

      const postsResponse = await api.get("/posts");
      setPosts(postsResponse.data);
    } catch (error) {
      console.error("Erro ao reagir ao post:", error);
    }
  };

  const handleToggleVisibility = async (postId: number) => {
    const wasVisible = visiblePosts[postId] || false;

    if (!wasVisible) {
      await api.post(`/posts/${postId}/view`);

      setPosts((prevPosts) =>
        prevPosts.map((p) =>
          p.id === postId ? { ...p, views: p.views + 1 } : p
        )
      );
    }

    setVisiblePosts((prev) => ({
      ...prev,
      [postId]: !wasVisible,
    }));
  };

  const handleUpdatePost = async (
    postId: number,
    title: string,
    description: string
  ) => {
    try {
      await api.put(`/posts/${postId}`, { title, description });
      setPosts((prevPosts) =>
        prevPosts.map((p) =>
          p.id === postId ? { ...p, title, description } : p
        )
      );
      alert("Post atualizado com sucesso");
    } catch (error) {
      console.error("Erro ao atualizar o post:", error);
      alert("Não foi possível atualizar o post.");
    }
  };

  const onDeletePost = async (postId: number) => {
    try {
      await api.delete(`/posts/${postId}`);
      setPosts((prevPosts) => prevPosts.filter((p) => p.id !== postId));
      alert("Post deletado com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar o post:", error);
      alert("Não foi possível deletar o post.");
    }
  };

  const onUpdateComment = async (
    postId: number,
    commentId: number,
    description: string
  ) => {
    try {
      await api.patch(`/comments/${commentId}/description`, { description });
      setPosts((prevPosts) =>
        prevPosts.map((p) => {
          if (p.id === postId) {
            return {
              ...p,
              comments: p.comments.map((c) =>
                c.id === commentId ? { ...c, description } : c
              ),
            };
          }
          return p;
        })
      );
      alert("Comentário atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar o comentário:", error);
      alert("Não foi possível atualizar o comentário.");
    }
  };

  return (
    <div className=" w-full flex flex-col justify-center mt-10 items-start">
      <div className="flex justify-center w-full items-center">
        <div className="flex flex-col justify-center items-center min-w-[400px] md:min-w-[500px] lg:min-w-[600px]">
          <CreatePostForm
            isAuthenticated={isAuthenticated}
            onCreatePost={onCreatePost}
          />

          <div className="text-center mb-3 font-extrabold text-xl">
            Últimos Posts Publicados
          </div>

          <div className="flex flex-col justify-between md:min-w-[70%] max-w-[800px] w-[95%] rounded">
            <ListPosts
              posts={posts}
              user={user}
              isAuthenticated={isAuthenticated}
              visiblePosts={visiblePosts}
              commentContents={commentContents}
              onToggleVisibility={handleToggleVisibility}
              onSetReaction={handleSetReaction}
              onDeleteComment={handleDeleteComment}
              onAddComment={handleAddComment}
              onCommentContentChange={(postId, value) =>
                setCommentContents((prev) => ({ ...prev, [postId]: value }))
              }
              onUpdatePost={handleUpdatePost}
              onDeletePost={onDeletePost}
              onUpdateComment={onUpdateComment}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
