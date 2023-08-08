import { useState, useEffect } from "react";

import { dataBase } from "../firebase/config";

import { getDoc, doc } from "firebase/firestore";

export const useFetchDocument = (docCollection, id) => {
  const [document, setDocument] = useState(null);

  const [cancelled, setCancelled] = useState(null);

  useEffect(() => {
    const loadDocument = async () => {
      if (cancelled || !id) return;

      try {
        const docRef = doc(dataBase, docCollection, id);
        const docSnap = await getDoc(docRef);

        setDocument(docSnap.data());
      } catch (error) {
        console.log(error);
      }
    };

    loadDocument();
  }, [docCollection, id, cancelled]);

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { document };
};
