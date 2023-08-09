import Link from "next/link";
import Image from "next/image";

import { useEffect, useState } from "react";

import { useAuthentication } from "../../../hooks/useAuthentication";
import { useFetchDocument } from "../../../hooks/useFetchDocument";
import { useDeleteDocument } from "../../../hooks/useDeleteDocument";
import { useFetchDocuments } from "../../../hooks/useFetchDocuments";

import { onAuthStateChanged } from "firebase/auth";

import { useRouter } from "next/router";

import Footer from "../../../components/Footer";
import Header from "../../../components/Header";

import "../../../styles/post.css";
import "../../../styles/global.css";
import Head from "next/head";

Post.getInitialProps = ({ query }) => {
  return {
    title: query.title,
  };
};

export default function Post(props) {
  const [date, setDate] = useState("");
  const [user, setUser] = useState(false);

  const { auth } = useAuthentication();

  const router = useRouter();

  const { documents: posts } = useFetchDocuments("posts");
  const { deleteDocument } = useDeleteDocument("posts");

  const searchPost = () => {
    const title = props.title.replace(/-/g, " ");

    const postId = posts.filter((post) => {
      return (
        post.title
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[?]/g, "")
          .toLowerCase() === title.toLowerCase()
      );
    });

    const newId = postId.map((post) => post.id);

    return newId[0];
  };

  const id = searchPost();

  const { document: post } = useFetchDocument("posts", id);

  const handleDelete = () => {
    deleteDocument(id);

    router.push("/blog");
  };

  useEffect(() => {
    if (post && post.createdAt) {
      const datePost = new Date(post.createdAt.seconds * 1000).toLocaleString(
        "pt-BR",
        {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }
      );

      setDate(datePost);
    }
  }, [post]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  return (
    <div>
      <Head>
        <title>{post && post.length !== 0 && post.title}</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>

      <Header />

      {post && post.length !== 0 && (
        <div className="post-content">
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

          <h1>{post.title}</h1>

          <div dangerouslySetInnerHTML={{ __html: post.content }} />

          <div className="date-and-at">
            <p>
              <strong>Por</strong> {post.createBy}.
            </p>

            <p>{date}</p>
          </div>

          {user && (
            <div className="actions">
              <button type="button" onClick={handleDelete}>
                Deletar post
              </button>

              <Link
                href={`/blog/atualizar-post/[id]`}
                as={"/blog/atualizar-post/" + id}
              >
                Editar post
              </Link>
            </div>
          )}
        </div>
      )}

      <Footer />
    </div>
  );
}
