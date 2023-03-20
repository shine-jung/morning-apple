import { uuidv4 } from '@firebase/util';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../service/firebase';

export const onSubmitImage = async (imageFile: File) => {
  const fileName = uuidv4() + imageFile.name;
  if (imageFile?.name) {
    const storageRef = ref(storage, `images/${fileName}`);
    await uploadBytes(storageRef, imageFile);
    return await getDownloadURL(ref(storage, `images/${fileName}`));
  }

  return null;
};
