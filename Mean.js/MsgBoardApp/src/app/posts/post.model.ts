import { postTypes } from "./postTypes.enum";

export interface Post {
  id: string;
  title: string;
  content: string;
  type: postTypes;
  image: any;
}
