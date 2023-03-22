import { collection, deleteDoc, doc, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from '../../../service/firebase';
import { IPost } from '../../../types/post';

export const getPosts = async () => {
  const posts = [] as IPost[];
  const postsRef = collection(db, 'post');
  const q = query(postsRef, where('viewed', '==', false), orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    posts.push({ id: doc.id, ...doc.data() } as IPost);
  });
  return posts;
};

export const deletePost = async (id: string) => {
  const postsRef = doc(db, 'post', id);
  await deleteDoc(postsRef);
};
