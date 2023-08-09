import Head from "next/head";

import { useEffect, useState } from "react";

import { useInsertDocument } from "../../hooks/useInsertDocument";
import { useAuthentication } from "../../hooks/useAuthentication";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";

import { useRouter } from "next/router";

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase/config";
import { onAuthStateChanged } from "firebase/auth";

import Footer from "../../components/Footer";
import Header from "../../components/Header";

import "../../styles/form-create.css";
import "../../styles/global.css";

export default function CreateLive() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [hour, setHour] = useState("");
  const [url, setUrl] = useState("");

  const [user, setUser] = useState(false);

  const { insertDocument, response } = useInsertDocument("lives");
  const { updateDocument } = useUpdateDocument("lives");

  const { auth } = useAuthentication();

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const file = e.target[3]?.files[0];

    const liveId = await insertDocument({
      title,
      date,
      hour,
      url,
      uid: user.uid,
      createBy: user.displayName,
    });

    const storageRef = ref(storage, `images/${liveId}`);
    const uploadSnapshot = await uploadBytes(storageRef, file);

    getDownloadURL(uploadSnapshot.ref).then((url) => {
      updateDocument(liveId, { image: url });

      router.push("/lives");
    });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        router.push("/");
      }
    });
  }, [auth, router]);

  return (
    <div>
      <Head>
        <title>Nova transmissão | PIB Duas Barras</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>

      <Header />

      <div className="create-post">
        <h3>Criar transmissão</h3>

        <form className="create-form" onSubmit={handleSubmit}>
          <label>
            <span>Título da live</span>
            <input
              type="text"
              name="title"
              placeholder="Escreva o título do post..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>

          <div className="form-group">
            <label>
              <span>Data</span>
              <input
                type="text"
                name="date"
                placeholder="Ex: 10/07"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </label>

            <label>
              <span>Horário</span>
              <input
                type="text"
                name="hour"
                placeholder="Ex: 19:30"
                value={hour}
                onChange={(e) => setHour(e.target.value)}
                required
              />
            </label>
          </div>

          <label>
            <span>Imagem</span>
            <input type="file" name="image" />
          </label>

          <label>
            <span>Link da live</span>
            <input
              type="text"
              name="link"
              placeholder="Escreva a legenda do post..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
          </label>

          <button type="submit">Confirmar</button>
        </form>
      </div>

      <Footer />
    </div>
  );
}
