'use client';

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from 'src/libs/firebase/config';
import { setSession } from './utils';

/** **************************************
 * Sign out
 *************************************** */
export const signOut = async () => {
  try {
    await setSession(null);
  } catch (error) {
    console.error('Error during sign out:', error);
    throw error;
  }
};

// testing menggunakan data dummy
// Testing sign in with others role

export const signInOrSignUpWithGoogle = async () => {
  try {
    const googleProvider = new GoogleAuthProvider();
    const response = await signInWithPopup(auth, googleProvider);
    if (response.user) {
      // setSession(response.user.accessToken);
      return response.user;
    }
  } catch (error) {
    throw error;
  }
};

export const signUpWithEmailPassword = async (email, password) => {
  try {
    console.log(email, password);
    const response = await createUserWithEmailAndPassword(auth, email, password);

    if (response.user) {
      setSession(response.user.accessToken);
      return response.user;
    }
  } catch (error) {
    throw error;
  }
};

export const signInWithEmailPassword = async (email, password) => {
  try {
    console.log(email, password);
    const response = await signInWithEmailAndPassword(auth, email, password);
    console.log(response);

    if (response.user) {
      setSession(response.user.accessToken);
      return response;
    }
  } catch (error) {
    throw error;
  }
};
