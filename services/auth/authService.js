import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import { ERROR_MSG } from "../../utils/errorMessage";

const auth = FIREBASE_AUTH;

// Custom hook for handling email/password authentication
export const useMailPasswordAuthentication = () => {
  // Sign in user with email and password
  const signInUser = async (email, password) => {
    try {
      const {user} = await signInWithEmailAndPassword(auth, email, password);
      return user;
    } catch (error) {
      throw ERROR_MSG[error.code];
    }
  };
  
  // Sign up user with email and password
  const signUpUser = async (email, password) => {
    try {
      const {user} = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return user;
    } catch (error) {
      throw ERROR_MSG[error.code];
    }
  };

  return { signInUser, signUpUser };
};

// Logs out the current user
export const logOut = () => {
  FIREBASE_AUTH.signOut();
};
