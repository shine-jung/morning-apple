import { uuidv4 } from '@firebase/util';
import imageCompression from 'browser-image-compression';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../service/firebase';

const options = {
  maxSizeMB: 1, // 허용하는 최대 사이즈 지정
  maxWidthOrHeight: 1080, // 허용하는 최대 width, height 값 지정
  useWebWorker: true, // webworker 사용 여부
};

export const onSubmitImage = async (imageFile: File) => {
  const compressedFile = await imageCompression(imageFile, options);
  const fileName = uuidv4() + compressedFile.name;
  const storageRef = ref(storage, `images/${fileName}`);
  await uploadBytes(storageRef, compressedFile);
  return await getDownloadURL(ref(storage, `images/${fileName}`));
};
