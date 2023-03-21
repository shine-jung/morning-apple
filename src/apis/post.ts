import imageCompression from 'browser-image-compression';
import { addDoc, collection, doc, getDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../service/firebase';
import { IFormData, IPost } from '../types/post';
import { onSubmitImage } from '../utils/uploadImage';

const options = {
  maxSizeMB: 1, // 허용하는 최대 사이즈 지정
  maxWidthOrHeight: 500, // 허용하는 최대 width, height 값 지정
  useWebWorker: true, // webworker 사용 여부
};

export const addPost = async (data: IFormData) => {
  let imageURL = null;
  if (data.imageFile) {
    const compressedFile = await imageCompression(data.imageFile, options);
    imageURL = await onSubmitImage(compressedFile);
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
