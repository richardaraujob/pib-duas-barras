import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";

import { useEffect, useState } from "react";
import { app } from "../firebase/config";

export const useAuthentication = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  const [cancelled, setCancelled] = useState(false);

  const auth = getAuth(app);

  function checkIfIsCancelled() {
    if (cancelled) {
      return;
    }
  }

  // register

  const createUser = async (data) => {
    checkIfIsCancelled();

    setLoading(!loading);

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await updateProfile(user, {
        displayName: data.name,
      });

      return user;
    } catch (error) {
      console.log(error.message);
    }

    setLoading(!loading);
  };

  // logout

  const logout = () => {
    checkIfIsCancelled();

    signOut(auth);
  };

  // login

  const login = async (data) => {
    checkIfIsCancelled();

    try {
      signInWithEmailAndPassword(auth, data.email, data.password);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    return () => setCancelled(!cancelled);
  }, []);

  return {
    auth,
    createUser,
    error,
    loading,
    logout,
    login,
  };
};
