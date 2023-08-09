import Head from "next/head";

import { useState } from "react";

import { useAuthentication } from "../hooks/useAuthentication";

import { useRouter } from "next/router";

import Footer from "../components/Footer";
import Header from "../components/Header";

import "../styles/login.css";
import "../styles/global.css";

export default function Admin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, error: authError, loading } = useAuthentication();

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    const res = await login(user);

    router.push("/");

    console.log(res);
  };

  return (
    <div>
      <Head>
        <title>Admin | PIB Duas Barras</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>

      <Header />

      <main className="login-container">
        <form onSubmit={handleSubmit}>
          <h1>Faça login</h1>

          <label>
            <span>E-mail:</span>
            <input
              type="text"
              placeholder="Digite seu e-mail..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label>
            <span>Senha:</span>
            <input
              type="password"
              placeholder="Digite sua senha..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <button type="submit">Entrar</button>
        </form>
      </main>

      <Footer />
    </div>
  );
}
