import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCyu5uWoX-wWqdtqir7KpmG6UOaBE_s4IA",
  authDomain: "igreja-batista-b9e5d.firebaseapp.com",
  projectId: "igreja-batista-b9e5d",
  storageBucket: "igreja-batista-b9e5d.appspot.com",
  messagingSenderId: "695819249176",
  appId: "1:695819249176:web:ae6cdfbf34d34f2db6056d",
};

const app = initializeApp(firebaseConfig);

const dataBase = getFirestore(app);
const storage = getStorage(app);

export { app, dataBase, storage };
