import Image from "next/image";
import Link from "next/link";

import "../styles/global.css";
import "../styles/page-404.css";

export default function NotFound() {
  return (
    <div className="page-404">
      <Image
        className="logo"
        src="/images/logo-pib.jpg"
        width={100}
        height={56}
        priority={true}
        alt="Logo"
      />

      <h1>Erro 404</h1>

      <p>Não foi possível encontrar esta página.</p>

      <Link href="/">Voltar</Link>
    </div>
  );
}
