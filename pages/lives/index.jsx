import Link from "next/link";
import Image from "next/image";

import { useEffect, useState } from "react";

import { useAuthentication } from "../../hooks/useAuthentication";
import { useDeleteDocument } from "../../hooks/useDeleteDocument";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";

import { onAuthStateChanged } from "firebase/auth";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

import "../../styles/global.css";
import "../../styles/generic-page.css";
import "../../styles/cards.css";

export default function Lives() {
  const [user, setUser] = useState(false);
  const { documents: lives } = useFetchDocuments("lives");

  const { auth } = useAuthentication();

  const { deleteDocument } = useDeleteDocument("lives");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);
  return (
    <div>
      <Header />

      <main className="content">
        <div className="background-img">
          <h1>Transmissões</h1>
        </div>

        {user && (
          <Link className="create-live" href="/lives/nova-live">
            Nova transmissão
          </Link>
        )}

        <section className="container-content-grid">
          {lives &&
            lives.map((live) => (
              <div key={live.id} className="live-card">
                <Image
                  src={live.image}
                  width={1920}
                  height={1080}
                  style={{
                    width: "100%",
                    height: "auto",
                  }}
                  priority={true}
                  alt={live.title}
                />

                <div>
                  <Link href={live.url} target="_blank">
                    {live.title}
                  </Link>

                  <span>
                    <p>{live.date}</p>

                    <p>{live.hour}</p>
                  </span>

                  {user && (
                    <button
                      className="delete-btn"
                      onClick={() => deleteDocument(live.id)}
                    >
                      Apagar
                    </button>
                  )}
                </div>
              </div>
            ))}

          {lives.length === 0 && (
            <>
              <h3>sem eventos</h3>
            </>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
