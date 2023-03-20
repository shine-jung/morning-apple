import { addDoc, collection, doc, getDoc, getDocs, serverTimestamp } from 'firebase/firestore';
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

  console.log(response);

  return response.data() as IPost;
};

export const getPosts = async () => {
  const posts = [] as IPost[];
  const querySnapshot = await getDocs(collection(db, 'post'));
  querySnapshot.forEach((doc) => {
    posts.push({ id: doc.id, ...doc.data() } as IPost);
  });

  return posts;
};
