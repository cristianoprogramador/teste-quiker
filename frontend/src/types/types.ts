
export type Comment = {
  id: number;
  user_id: number;
  user_name: string;
  description: string;
  deletedBy?: "author" | "owner";
};

export type Post = {
  id: number;
  user_id: number;
  user_name: string;
  title: string;
  description: string;
  likes: number;
  dislikes: number;
  views: number;
  createdAt: string;
  comments: Comment[];
};
