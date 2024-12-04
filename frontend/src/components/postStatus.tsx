import { Post } from "../types/types";

type PostStatusProps = {
  post: Post;
  onSetReaction: (postId: number, reaction: "LIKE" | "DISLIKE") => void;
};

export function PostStatus({ post, onSetReaction }: PostStatusProps) {
  return (
    <div className="flex flex-row justify-between my-3 text-sm">
      <div
        className="cursor-pointer hover:text-gray-600"
        onClick={() => onSetReaction(post.id, "LIKE")}
      >
        Gostei ({post.likes})
      </div>
      <div
        className="cursor-pointer hover:text-gray-600"
        onClick={() => onSetReaction(post.id, "DISLIKE")}
      >
        Não Gostei ({post.dislikes})
      </div>

      <div className="cursor-pointer hover:text-gray-600">
        Comentários ({post.comments.length})
      </div>
      <div className="cursor-pointer hover:text-gray-600">
        Visualizações: {post.views}
      </div>
    </div>
  );
}
