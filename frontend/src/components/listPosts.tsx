import { AddComment } from "./addComment";
import { ListComments } from "./listComments";
import { PostStatus } from "./postStatus";
import { UserDataDto } from "../contexts/auth";
import { Post } from "../types/types";
import { useState } from "react";
import {
  IoCheckmarkSharp,
  IoCloseSharp,
  IoTrashOutline,
} from "react-icons/io5";
import { CiEdit } from "react-icons/ci";

type ListPostsProps = {
  posts: Post[];
  user: UserDataDto | null;
  isAuthenticated: boolean;
  visiblePosts: { [key: number]: boolean };
  commentContents: { [key: number]: string };
  onToggleVisibility: (postId: number) => void;
  onSetReaction: (postId: number, reaction: "LIKE" | "DISLIKE") => void;
  onDeleteComment: (
    postId: number,
    commentId: number,
    deletedBy: "author" | "owner"
  ) => void;
  onAddComment: (postId: number) => void;
  onCommentContentChange: (postId: number, value: string) => void;
  onUpdatePost: (
    postId: number,
    title: string,
    description: string
  ) => Promise<void>;
  onDeletePost: (postId: number) => Promise<void>;
  onUpdateComment: (
    postId: number,
    commentId: number,
    description: string
  ) => Promise<void>;
};

type EditingPostState = {
  isEditing: boolean;
  title: string;
  description: string;
};

export function ListPosts({
  posts,
  user,
  isAuthenticated,
  visiblePosts,
  commentContents,
  onToggleVisibility,
  onSetReaction,
  onDeleteComment,
  onAddComment,
  onCommentContentChange,
  onUpdatePost,
  onDeletePost,
  onUpdateComment
}: ListPostsProps) {
  const [editingPosts, setEditingPosts] = useState<{
    [key: number]: EditingPostState;
  }>({});

  const startEditing = (post: Post) => {
    setEditingPosts((prev) => ({
      ...prev,
      [post.id]: {
        isEditing: true,
        title: post.title,
        description: post.description,
      },
    }));
  };

  const cancelEditing = (postId: number) => {
    setEditingPosts((prev) => {
      const newState = { ...prev };
      delete newState[postId];
      return newState;
    });
  };

  const handleChangeTitle = (postId: number, value: string) => {
    setEditingPosts((prev) => ({
      ...prev,
      [postId]: {
        ...prev[postId],
        title: value,
      },
    }));
  };

  const handleChangeDescription = (postId: number, value: string) => {
    setEditingPosts((prev) => ({
      ...prev,
      [postId]: {
        ...prev[postId],
        description: value,
      },
    }));
  };

  const saveChanges = async (postId: number) => {
    const { title, description } = editingPosts[postId];
    await onUpdatePost(postId, title, description);
    setEditingPosts((prev) => {
      const newState = { ...prev };
      delete newState[postId];
      return newState;
    });
  };



  return (
    <>
      {posts.map((post) => {
        const isVisible = visiblePosts[post.id] || false;
        const canEdit = isAuthenticated && user?.id === post.user_id;
        const editingState = editingPosts[post.id];
        const isEditing = editingState?.isEditing;

        return (
          <div
            key={post.id}
            className="flex flex-col gap-2 border-2 rounded border-gray-600 px-3 py-2 mb-4"
          >
            <div
              className="flex flex-row justify-between w-full cursor-pointer hover:underline"
              onClick={() => onToggleVisibility(post.id)}
            >
              {isEditing ? (
                <input
                  className="border w-full mr-2"
                  value={editingState.title}
                  onChange={(e) => handleChangeTitle(post.id, e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                />
              ) : (
                <div className="text-xl font-semibold">{post.title}</div>
              )}
              <div className="flex text-xs italic text-center">
                {new Date(post.createdAt).toLocaleString()}
              </div>
            </div>

            {isVisible && (
              <div className="flex flex-col relative">
                {isEditing ? (
                  <textarea
                    className="border w-full my-2"
                    value={editingState.description}
                    onChange={(e) =>
                      handleChangeDescription(post.id, e.target.value)
                    }
                    onClick={(e) => e.stopPropagation()}
                  />
                ) : (
                  <div>{post.description}</div>
                )}

                <div className="flex justify-end font-bold text-xs">
                  Publicado por: {post.user_name}
                </div>

                <PostStatus post={post} onSetReaction={onSetReaction} />

                <ListComments
                  comments={post.comments}
                  post={post}
                  user={user}
                  isAuthenticated={isAuthenticated}
                  onDeleteComment={onDeleteComment}
                  onUpdateComment={onUpdateComment}
                />

                {isAuthenticated && (
                  <AddComment
                    value={commentContents[post.id] || ""}
                    onChange={(value) => onCommentContentChange(post.id, value)}
                    onSubmit={() => onAddComment(post.id)}
                  />
                )}

                {canEdit && !isEditing && (
                  <div className="absolute bottom-0 right-0 flex gap-2">
                    <CiEdit
                      size={25}
                      className="text-gray-600 cursor-pointer hover:opacity-75"
                      onClick={(e) => {
                        e.stopPropagation();
                        startEditing(post);
                      }}
                    />
                    <IoTrashOutline
                      size={25}
                      className="text-gray-600 cursor-pointer hover:opacity-75"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (
                          window.confirm("Deseja realmente deletar este post?")
                        ) {
                          onDeletePost(post.id);
                        }
                      }}
                    />
                  </div>
                )}

                {isEditing && (
                  <div className="flex justify-end gap-2">
                    <IoCheckmarkSharp
                      size={20}
                      className="text-green-600 cursor-pointer hover:opacity-75"
                      onClick={(e) => {
                        e.stopPropagation();
                        saveChanges(post.id);
                      }}
                    />
                    <IoCloseSharp
                      size={20}
                      className="text-red-600 cursor-pointer hover:opacity-75"
                      onClick={(e) => {
                        e.stopPropagation();
                        cancelEditing(post.id);
                      }}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}
