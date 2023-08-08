import Image from "next/image";
import Link from "next/link";

import InstagramIcon from "remixicon-react/InstagramFillIcon";
import YoutubeIcon from "remixicon-react/YoutubeFillIcon";

import "../styles/footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div>
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
      </div>

      <div>
        <Link href="https://www.instagram.com/pibduasbarras/" target="_blank">
          <InstagramIcon color="#adb83b" />
        </Link>

        <Link
          href="https://www.youtube.com/@primeiraigrejabatistaemdua1358"
          target="_blank"
        >
          <YoutubeIcon color="#adb83b" />
        </Link>
      </div>

      <p>&copy; Copyright - PIB Duas Barras {new Date().getFullYear()}</p>
    </footer>
  );
}
