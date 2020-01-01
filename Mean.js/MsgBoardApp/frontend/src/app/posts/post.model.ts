import { postTypes } from './postTypes.enum';

export interface Post {
    title: string;
    content: string;
    type: postTypes;
}
