import * as admin from 'firebase-admin';

export interface IPost {
  id: string;
  nickname: string;
  content: string;
  imageURL: string;
  createdAt: admin.firestore.Timestamp;
}
