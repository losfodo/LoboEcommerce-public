import styles from "./styles.module.scss";
import { useSession, signIn } from "next-auth/react";
import Link from "next/link";
import Image from 'next/image';
export default function Empty() {
  const { data: session } = useSession();
  return (
    <div className={styles.empty}>
      <Image src="/images/empty.png" alt="" width={110} height={110} style={{ width: "auto", height: "auto" }} />
      {/* <img src="../../../images/empty.png" alt="" /> */}
      <h1>carrinho esta vazio</h1>
      {!session && (
        <button onClick={() => signIn()} className={styles.empty__btn}>
          ENTRAR / CADASTRE-SE
        </button>
      )}
      <Link href="/">{/*<Link href="/browse"> */}
        {/* <a> */}
          <button className={`${styles.empty__btn} ${styles.empty__btn_v2}`}>
            COMPRE AGORA
          </button>
        {/* </a> */}
      </Link>
    </div>
  );
}
