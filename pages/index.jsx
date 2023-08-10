"user client";

import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import { useEffect, useState } from "react";

import { useFetchDocuments } from "../hooks/useFetchDocuments";
import { useInsertDocument } from "../hooks/useInsertDocument";

import { AuthProvider } from "../context/authContext";
import { useAuthentication } from "../hooks/useAuthentication";

import { onAuthStateChanged } from "firebase/auth";

import Footer from "../components/Footer";
import Header from "../components/Header";

import "../styles/global.css";
import "../styles/home.css";
import "../styles/cards.css";

export default function App() {
  // const [user, setUser] = useState(false);
  const [email, setEmail] = useState("");

  const { insertDocument } = useInsertDocument("emails");

  const { documents: lives } = useFetchDocuments("lives", true);
  const { documents: events } = useFetchDocuments("events", true);
  const { documents: posts } = useFetchDocuments("posts", true);

  const handleSubmit = (e) => {
    e.preventDefault();

    insertDocument({
      email,
    });

    setEmail("");
  };

  // const { auth } = useAuthentication();

  /*useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth, user]);*/

  return (
    <div>
      <Head>
        <title>Primeira Igreja Batista de Duas Barras</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>

      <Header />

      <main>
        <div className="banner">
          <h1>
            Nos acompanhe <br />e fique por dentro
            <br />
            das notícias
          </h1>
        </div>

        <div className="home-blog">
          <h1>Transmissões</h1>

          <section>
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
                  </div>
                </div>
              ))}
          </section>
        </div>

        <div className="home-blog background-white">
          <h1>Eventos</h1>

          <section>
            {events &&
              events.map((event) => (
                <div className="event-card" key={event.id}>
                  <div>
                    <p>{event.day}</p>
                  </div>

                  <p>
                    <span className="marker"></span>
                    {event.title}
                  </p>

                  <span>{event.hour}</span>
                </div>
              ))}
          </section>
        </div>

        <div className="home-blog">
          <h1>Blog</h1>

          <section>
            {posts &&
              posts.map((post) => (
                <article key={post.id} className="post-card">
                  <Image
                    src={post.image}
                    width={1920}
                    height={1080}
                    style={{
                      width: "100%",
                      height: "auto",
                    }}
                    priority={true}
                    alt={post.title}
                  />

                  <p>{post.title}</p>

                  <Link
                    href={`/blog/post/[title]`}
                    as={
                      "/blog/post/" +
                      post.title
                        .replace(/\s/g, "-")
                        .normalize("NFD")
                        .replace(/[\u0300-\u036f]/g, "")
                        .replace(/[?]/g, "")
                        .toLowerCase()
                    }
                  >
                    Ler mais
                  </Link>
                </article>
              ))}
          </section>
        </div>

        <div className="newsletter">
          <span>Newsletter</span>

          <h1>Fique sempre informado sobre nossas novidades</h1>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="email"
              placeholder="Digite seu e-mail..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button type="submit">Confirmar</button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
