import Link from "next/link";// criar um link para a página
import styles from "./styles.module.scss";

export default function Ad() {
  return (
    <Link href="/">{/*<Link href="/browse"> */}
      <div className={styles.ad}></div>
    </Link>
  );
}