import styles from "./styles.module.scss";
// import { FaFacebookF, FaTiktok } from "react-icons/fa";
import {
  BsInstagram,
  BsTwitter,
  BsYoutube,
  BsPinterest,
  BsWhatsapp,
  BsCodeSlash
} from "react-icons/bs";
import { MdOutlineMailOutline } from "react-icons/md";
export default function Socials() {
  return (
    <div className={styles.footer__socials}>
      <section>
        <h3>ENTRE EM CONTATO</h3>
        <ul>
          {/* <li>
            <a href="/" target="_blank">
              <FaFacebookF />
            </a>
          </li> */}
          {/* <li>
            <a href="/" target="_blank">
              <BsInstagram />
            </a>
          </li> */}
          <li>
            <a href="/https://wa.me/554896294362" target="_blank">
            <BsWhatsapp />
            </a>
          </li>
          <li>
            <a href="/" target="_blank">
              <MdOutlineMailOutline />
            </a>
          </li>
          {/* <li>
            <a href="https://rafael-lino-lobo.netlify.app/" target="_blank">
              <BsCodeSlash />
            </a>
          </li> */}
          {/* <li>
            <a href="/" target="_blank">
              <BsPinterest />
            </a>
          </li> */}
          {/* <li>
            <a href="/" target="_blank">
              <BsSnapchat />
            </a>
          </li> */}
          {/* <li>
            <a href="/" target="_blank">
              <FaTiktok />
            </a>
          </li> */}
        </ul>
      </section>
    </div>
  );
}
