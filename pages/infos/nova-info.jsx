import Head from "next/head";

import { useEffect, useState } from "react";

import { useInsertDocument } from "../../hooks/useInsertDocument";
import { useAuthentication } from "../../hooks/useAuthentication";

import { useRouter } from "next/router";

import { onAuthStateChanged } from "firebase/auth";

import Footer from "../../components/Footer";
import Header from "../../components/Header";

import "../../styles/form-create.css";
import "../../styles/global.css";

export default function CreateInfo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [user, setUser] = useState(false);

  const { insertDocument, response } = useInsertDocument("informes");

  const { auth } = useAuthentication();

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    const date = `${new Date().getDate()}/${
      new Date().getMonth() + 1
    }/${new Date().getFullYear()}`;

    insertDocument({
      title,
      description,
      date,
      uid: user.uid,
      createBy: user.displayName,
    });

    router.push("/infos");
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
        <title>PIB Duas Barras | Nova informação</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>

      <Header />

      <main className="create-post">
        <h3>Criar nova informação</h3>

        <form className="create-form" onSubmit={handleSubmit}>
          <label>
            <span>Título da informação</span>
            <input
              type="text"
              name="title"
              placeholder="Escreva o título da informação..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>

          <label>
            <span>Descrição</span>
            <textarea
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </label>

          <button type="submit">Confirmar</button>
        </form>
      </main>

      <Footer />
    </div>
  );
}
