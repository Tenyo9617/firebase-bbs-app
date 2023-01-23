export interface IPost {
  id: string;
  author: string;
  content: string;
  created_at: string;
  hashTags: string[];
  reactions: {
    thumbsUp: number;
    heart: number;
    commentsCount: number;
  };
  comments: Comment[];
}

export interface IComment {
  id: string;
  author: string;
  comment: string;
}
