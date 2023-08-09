import Head from "next/head";
import Link from "next/link";

import { useEffect, useState } from "react";

import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useAuthentication } from "../../hooks/useAuthentication";
import { useDeleteDocument } from "../../hooks/useDeleteDocument";

import { onAuthStateChanged } from "firebase/auth";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

import "../../styles/global.css";
import "../../styles/generic-page.css";
import "../../styles/cards.css";

export default function Events() {
  const [user, setUser] = useState(false);

  const { documents: events } = useFetchDocuments("events");

  const { auth } = useAuthentication();

  const { deleteDocument } = useDeleteDocument("events");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  return (
    <div>
      <Head>
        <title>Eventos | PIB Duas Barras</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>

      <Header />

      <main className="content">
        <div className="background-img">
          <h1>Eventos</h1>
        </div>

        {user && (
          <Link className="create-live" href="/events/novo-evento">
            Novo evento
          </Link>
        )}

        <section className="container-content">
          {events &&
            events.map((event) => (
              <div className="event-card" key={event.id}>
                <div>
                  <p>{event.day}</p>

                  {user && (
                    <button
                      className="delete-btn"
                      onClick={() => deleteDocument(event.id)}
                    >
                      Apagar
                    </button>
                  )}
                </div>

                <p>
                  <span className="marker"></span>
                  {event.title}
                </p>

                <span>{event.hour}</span>
              </div>
            ))}

          {events.length === 0 && <h3>sem eventos</h3>}
        </section>
      </main>

      <Footer />
    </div>
  );
}
