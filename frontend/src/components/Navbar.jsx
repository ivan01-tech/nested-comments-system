import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaTelegram, FaWhatsapp } from "react-icons/fa";

function Navbar() {
  return (
    <header className="fixed top-0 right-0 left-0 flex justify-center items-center p-4 bg-slate-600 text-white z-50">
      <nav className="w-full flex flex-col gap-2 items-center max-w-4xl sm:flex-row sm:justify-between">
        <h1 className="text-xl font-extrabold text-white/80 hover:text-white">
          <Link href="/" className="no-underline">
            Ivan01-tech
          </Link>
        </h1>

        <ul className="list-none flex items-center gap-4 ">
          <li className="text-2xl text-white/80 hover:text-white">
            <Link href={ "/" }>
              <FaFacebook />
            </Link>
          </li>
          <li className="text-2xl text-white/80 hover:text-white">
            <Link href={ "/" }>
              <FaTwitter />
            </Link>
          </li>
          <li className="text-2xl text-white/80 hover:text-white">
            <Link href={ "/" }>
              <FaTelegram />
            </Link>
          </li>
          <li className="text-2xl text-white/80 hover:text-white">
            <Link href={ "/" }>
              <FaWhatsapp />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
