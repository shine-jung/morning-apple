import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../../../service/firebase';

export const login = async (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password).catch((error) => {
    const errorMessage = error.message;
    alert(`Login failed.\n${errorMessage}`);
  });
};

export const logout = () => {
  if (window.confirm('로그아웃 하시겠습니까?')) {
    signOut(auth);
  }
};
