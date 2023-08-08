import { useState, useEffect } from "react";

import { dataBase } from "../firebase/config";

import {
  collection,
  query,
  orderBy,
  onSnapshot,
  limit,
  where,
  getDoc,
  doc,
} from "firebase/firestore";

export const useFetchDocuments = (
  docCollection,
  limited,
  search = null,
  uid = null
) => {
  const [documents, setDocuments] = useState([]);

  const [cancelled, setCancelled] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      if (cancelled) return;

      const collectionRef = collection(dataBase, docCollection);

      try {
        let q;

        if (limited) {
          q = query(collectionRef, orderBy("createdAt", "desc"), limit(4));
        } else {
          q = query(collectionRef, orderBy("createdAt", "desc"));
        }

        onSnapshot(q, (querySnapshot) => {
          const collectionItens = [];

          querySnapshot.forEach((doc) => {
            collectionItens.push({ id: doc.id, ...doc.data() });
          });

          setDocuments(collectionItens);
        });
      } catch (error) {
        console.log(error);
      }
    };

    loadData();
  }, [docCollection, documents, search, uid, cancelled, limited]);

  useEffect(() => {
    setCancelled(true);
  }, []);

  return { documents };
};
