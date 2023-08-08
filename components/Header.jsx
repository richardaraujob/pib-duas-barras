import Image from "next/image";
import Link from "next/link";

import { useEffect, useState } from "react";
import { useAuthentication } from "../hooks/useAuthentication";
import { onAuthStateChanged } from "firebase/auth";

import MenuIcon from "remixicon-react/MenuLineIcon";

import "../styles/header.css";

export default function Header() {
  const [user, setUser] = useState(false);
  const [menu, setMenu] = useState(false);

  const { logout, auth } = useAuthentication();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);
  return (
    <header className="header">
      <div className="row">
        <Link href="/">
          <Image
            className="logo"
            src="/images/logo-pib.jpg"
            width={100}
            height={56}
            priority={true}
            alt="Logo"
          />
        </Link>

        <nav>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>

            <li>
              <Link href="/blog">Blog</Link>
            </li>

            <li>
              <Link href="/events">Eventos</Link>
            </li>

            <li>
              <Link href="/infos">Informações</Link>
            </li>

            <li>
              <Link href="/lives">Transmissões</Link>
            </li>

            {user && (
              <li>
                <button className="logout-btn" type="button" onClick={logout}>
                  Sair
                </button>
              </li>
            )}
          </ul>
        </nav>

        <button
          className="menu-btn"
          type="button"
          onClick={() => setMenu(!menu)}
        >
          <MenuIcon color="#adb83b" size={42} />
        </button>

        {menu && (
          <ul className="mobile-menu">
            <li>
              <Link href="/">Home</Link>
            </li>

            <li>
              <Link href="/blog">Blog</Link>
            </li>

            <li>
              <Link href="/events">Eventos</Link>
            </li>

            <li>
              <Link href="/infos">Informações</Link>
            </li>

            <li>
              <Link href="/lives">Transmissões</Link>
            </li>

            {user && (
              <li>
                <button className="logout-btn" type="button" onClick={logout}>
                  Sair
                </button>
              </li>
            )}
          </ul>
        )}
      </div>
    </header>
  );
}
