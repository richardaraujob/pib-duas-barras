import { useEffect, useState } from "react";

import { useUpdateDocument } from "../../../hooks/useUpdateDocument";
import { useFetchDocument } from "../../../hooks/useFetchDocument";
import { useAuthentication } from "../../../hooks/useAuthentication";

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../firebase/config";
import { onAuthStateChanged } from "firebase/auth";

import { useRouter } from "next/router";

import dynamic from "next/dynamic";

import Footer from "../../../components/Footer";
import Header from "../../../components/Header";

import "../../../styles/form-create.css";
import "../../../styles/global.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import Head from "next/head";

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link"],
    ["clean"],
  ],
  clipboard: {
    matchVisual: false,
  },
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
];

UpdatePost.getInitialProps = ({ query }) => {
  return {
    id: query.id,
  };
};

export default function UpdatePost(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");

  const [user, setUser] = useState(false);

  const { updateDocument } = useUpdateDocument("posts");

  const { auth } = useAuthentication();

  const router = useRouter();

  const id = props.id;

  const { document: post } = useFetchDocument("posts", id);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const file = e.target[2]?.files[0];

    if (!file) return;
    if (!description) return;

    const data = {
      title,
      description,
      content,
      uid: user.uid,
      createBy: user.displayName,
    };

    updateDocument(id, data);

    const storageRef = ref(storage, `images/${id}`);
    const uploadSnapshot = await uploadBytes(storageRef, file);

    getDownloadURL(uploadSnapshot.ref).then((url) => {
      updateDocument(url, id);

      router.push("/blog");
    });
  };

  useEffect(() => {
    if (post) {
      setContent(post.content);
      setTitle(post.title);
      setDescription(post.description);
    }
  }, [post]);

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
        <title>PIB Duas Barras | Atualizar post</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>

      <Header />

      <div className="create-post">
        <h3>Atualizar post</h3>

        <form className="create-form" onSubmit={handleSubmit}>
          <label>
            <span>Título do post</span>
            <input
              type="text"
              name="title"
              placeholder="Escreva o título do post..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>

          <label>
            <span>Descrição do post</span>
            <input
              type="text"
              name="description"
              placeholder="Escreva a descrição do post..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>

          <label>
            <span>Foto de capa</span>
            <input type="file" name="image" />
          </label>

          <ReactQuill
            formats={formats}
            modules={modules}
            value={content}
            onChange={setContent}
          />

          <button type="submit">Confirmar</button>
        </form>
      </div>

      <Footer />
    </div>
  );
}
