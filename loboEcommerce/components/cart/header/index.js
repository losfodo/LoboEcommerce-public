import styles from "./styles.module.scss";
import Link from "next/link";
import { MdPlayArrow } from "react-icons/md";
import Image from 'next/image';
export default function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.header__left}>
          <Link href="/">
            <Image src="/logo.png" alt="" width={50} height={50} style={{ width: "auto", height: "auto" }} />
            {/* <img src="../../../logo.png" alt="" /> */}
          </Link>
        </div>
        <div className={styles.header__right}>
          <Link href="/">{/*<Link href="/browse" */}
            {/* <a> */}
            CONTINUE COMPRANDO
              <MdPlayArrow />
            {/* </a> */}
          </Link>
        </div>
      </div>
    </div>
  );
}
