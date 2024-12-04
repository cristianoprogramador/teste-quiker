import { useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
import { IoPencilSharp, IoCheckmarkSharp, IoCloseSharp } from "react-icons/io5";
import { Post, Comment } from "../types/types";
import { UserDataDto } from "../contexts/auth";

type ListCommentsProps = {
  comments: Comment[];
  post: Post;
  user: UserDataDto | null;
  isAuthenticated: boolean;
  onDeleteComment: (
    postId: number,
    commentId: number,
    deletedBy: "author" | "owner"
  ) => void;
  onUpdateComment: (
    postId: number,
    commentId: number,
    description: string
  ) => Promise<void>;
};

type EditingCommentState = {
  isEditing: boolean;
  description: string;
};

export function ListComments({
  comments,
  post,
  user,
  isAuthenticated,
  onDeleteComment,
  onUpdateComment,
}: ListCommentsProps) {
  const [editingComments, setEditingComments] = useState<{
    [key: number]: EditingCommentState;
  }>({});

  const startEditing = (comment: Comment) => {
    setEditingComments((prev) => ({
      ...prev,
      [comment.id]: {
        isEditing: true,
        description: comment.description,
      },
    }));
  };

  const cancelEditing = (commentId: number) => {
    setEditingComments((prev) => {
      const newState = { ...prev };
      delete newState[commentId];
      return newState;
    });
  };

  const handleChangeDescription = (commentId: number, value: string) => {
    setEditingComments((prev) => ({
      ...prev,
      [commentId]: {
        ...prev[commentId],
        description: value,
      },
    }));
  };

  const saveChanges = async (commentId: number) => {
    const { description } = editingComments[commentId];
    await onUpdateComment(post.id, commentId, description);
    setEditingComments((prev) => {
      const newState = { ...prev };
      delete newState[commentId];
      return newState;
    });
  };

  return (
    <>
      {comments.map((comment) => {
        const canDelete =
          isAuthenticated &&
          !comment.deletedBy &&
          (user?.id === comment.user_id || user?.id === post.user_id);
        const canEdit =
          isAuthenticated && !comment.deletedBy && user?.id === comment.user_id;

        const editingState = editingComments[comment.id];
        const isEditing = editingState?.isEditing;

        return (
          <div
            key={comment.id}
            className="relative flex flex-col border border-x-2 p-1 text-sm"
          >
            <div className="mr-4 font-bold">{comment.user_name}</div>
            {comment.deletedBy ? (
              <div className="italic text-center">
                {comment.deletedBy === "owner"
                  ? "*Comentário excluído pelo dono do post*"
                  : "*Comentário excluído pelo autor*"}
              </div>
            ) : isEditing ? (
              <textarea
                className="border w-full my-2"
                value={editingState.description}
                onChange={(e) =>
                  handleChangeDescription(comment.id, e.target.value)
                }
              />
            ) : (
              <div className="ml-1 mt-1">{comment.description}</div>
            )}

            {canDelete && !isEditing && (
              <div className="absolute right-2 top-2 flex gap-2">
                <IoTrashOutline
                  size={15}
                  color="red"
                  className="hover:opacity-75 cursor-pointer"
                  onClick={() => {
                    const deletedBy =
                      user?.id === post.user_id ? "owner" : "author";
                    onDeleteComment(post.id, comment.id, deletedBy);
                  }}
                />

                {canEdit && (
                  <IoPencilSharp
                    size={15}
                    className="text-gray-600 cursor-pointer hover:opacity-75"
                    onClick={(e) => {
                      e.stopPropagation();
                      startEditing(comment);
                    }}
                  />
                )}
              </div>
            )}

            {isEditing && (
              <div className="flex justify-end gap-2">
                <IoCheckmarkSharp
                  size={20}
                  className="text-green-600 cursor-pointer hover:opacity-75"
                  onClick={(e) => {
                    e.stopPropagation();
                    saveChanges(comment.id);
                  }}
                />
                <IoCloseSharp
                  size={20}
                  className="text-red-600 cursor-pointer hover:opacity-75"
                  onClick={(e) => {
                    e.stopPropagation();
                    cancelEditing(comment.id);
                  }}
                />
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}
