import { Timestamp } from 'firebase/firestore';

export interface IFormData {
  nickname: string;
  content: string;
  imageFile: File | null;
}

export interface IPost {
  id: string;
  nickname: string;
  content: string;
  imageURL: string;
  createdAt: Timestamp;
}
