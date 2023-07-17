import { PostImages } from '@type/post/PostImages';

export interface PostRequest {
  title: string;
  slug: string;
  content: string;
  images: PostImages | null;
  type: number;
  status: number;
}
