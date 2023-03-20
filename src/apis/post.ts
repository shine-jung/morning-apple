import { addDoc, collection, doc, getDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../service/firebase';
import { IFormData, IPost } from '../types/post';
import { onSubmitImage } from '../utils/uploadImage';

export const addPost = async (data: IFormData) => {
  let imageURL = null;
  if (data.imageFile) {
    imageURL = await onSubmitImage(data.imageFile);
  }
  const response = await addDoc(collection(db, 'post'), {
    nickname: data.nickname,
    content: data.content,
    imageURL,
    viewed: false,
    createdAt: serverTimestamp(),
  });

  return response.id;
};

export const getPost = async (id: string) => {
  const ref = doc(db, 'post', id);
  const response = await getDoc(ref);

  return response.data() as IPost;
};

export const getTodayPost = async () => {
  const ref = doc(db, 'today', 'post');
  const response = await getDoc(ref);

  return response.data() as IPost;
};
