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

export default function Infos() {
  const [user, setUser] = useState(false);

  const { documents: infos } = useFetchDocuments("informes");

  const { auth } = useAuthentication();

  const { deleteDocument } = useDeleteDocument("informes");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  console.log(infos);
  return (
    <div>
      <Header />

      <main className="content">
        <div className="background-img">
          <h1>Informações</h1>
        </div>

        {user && (
          <Link className="create-live" href="/infos/nova-info">
            Nova irformação
          </Link>
        )}

        <section className="container-content">
          {infos &&
            infos.map((info) => {
              return (
                <div className="info-card" key={info.id}>
                  <div>
                    <p>{info.title}</p>

                    <span>{info.date}</span>
                  </div>

                  {user && (
                    <button
                      className="delete-btn"
                      onClick={() => deleteDocument(info.id)}
                    >
                      Apagar
                    </button>
                  )}
                </div>
              );
            })}

          {infos.length === 0 && <h3>sem eventos</h3>}
        </section>
      </main>

      <Footer />
    </div>
  );
}
