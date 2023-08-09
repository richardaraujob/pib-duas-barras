import Head from "next/head";

import { useEffect, useState } from "react";

import { useInsertDocument } from "../../hooks/useInsertDocument";
import { useAuthentication } from "../../hooks/useAuthentication";

import { useRouter } from "next/router";

import { onAuthStateChanged } from "firebase/auth";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

import "../../styles/form-create.css";
import "../../styles/global.css";

export default function CreateEvent() {
  const [title, setTitle] = useState("");
  const [hour, setHour] = useState("");
  const [day, setDay] = useState("");

  const [user, setUser] = useState(false);

  const { insertDocument, response } = useInsertDocument("events");

  const { auth } = useAuthentication();

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    insertDocument({
      title,
      hour,
      day,
      uid: user.uid,
      createBy: user.displayName,
    });

    router.push("/events");
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
        <title>Novo evento | PIB Duas Barras</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>

      <Header />

      <main className="create-post">
        <h3>Criar novo evento</h3>

        <form className="create-form" onSubmit={handleSubmit}>
          <label>
            <span>Título do evento</span>
            <input
              type="text"
              name="title"
              placeholder="Escreva o título do evento..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>

          <label>
            <span>Dia do evento</span>
            <input
              type="text"
              name="day"
              placeholder="Ex: Sábado, Domingo, etc.."
              value={day}
              onChange={(e) => setDay(e.target.value)}
              required
            />
          </label>

          <label>
            <span>Horário</span>
            <input
              type="text"
              name="hour"
              placeholder="Ex: 19:30"
              maxLength="5"
              value={hour}
              onChange={(e) => setHour(e.target.value)}
              required
            />
          </label>

          <button type="submit">Confirmar</button>
        </form>
      </main>

      <Footer />
    </div>
  );
}
