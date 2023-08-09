import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import { useEffect, useState } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { onAuthStateChanged } from "firebase/auth";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

import "../../styles/global.css";
import "../../styles/generic-page.css";
import "../../styles/cards.css";

export default function Blog() {
  const [user, setUser] = useState(false);

  const { documents: posts } = useFetchDocuments("posts");

  const { auth } = useAuthentication();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);
  return (
    <div>
      <Head>
        <title>Blog | PIB Duas Barras</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>

      <Header />

      <main className="content">
        <div className="background-img">
          <h1>Blog</h1>
        </div>

        {user && (
          <Link className="create-live" href="/blog/novo-post">
            Novo post
          </Link>
        )}

        <section className="container-content-grid">
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

          {posts.length === 0 && <h3>sem eventos</h3>}
        </section>
      </main>

      <Footer />
    </div>
  );
}
