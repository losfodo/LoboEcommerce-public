import Link from "next/link";
import styles from "./styles.module.scss";
import { signOut, signIn } from "next-auth/react";
import { RiAdminLine } from "react-icons/ri";
import Image from 'next/image';
// import { useRouter } from "next/router";

export default function UserMenu({ session }) {//{ session } recebe props session q sobre login ou logado
  // const router = useRouter();
  const isAdmin = session?.user?.role === "admin";
    return (
        <div className={styles.menu}>
      <h4>Lobo Materiais de Construção</h4>
      {session ? (
        <div className={styles.flex}>
          <Image src={session?.user?.image} alt="" className={styles.menu__img} width={80} height={80} style={{ width: "auto", height: "auto" }}/>
          {/* <Image src={session?.user?.image} alt="" className={styles.menu__img} /> */}
          <div className={styles.col}>
            <span>Bem vindo de volta,</span>
            <h3>{session?.user?.name}</h3>
            <span onClick={() => signOut()}>Sair</span>
          </div>
        </div>
      ) : (
        <div className={styles.flex}>
          <button className={styles.btn_primary} onClick={() => signIn()}>Registrar</button>
          {/* <button className={styles.btn_primary} onClick={() => router.push("/signin")}>
            Registrar
          </button> */}
          {/* // <button className={styles.btn_outlined} onClick={() => router.push("/signin")}>
          //   Login
          // </button> */}
          <button className={styles.btn_outlined} onClick={() => signIn()}>
            Login
          </button>
        </div>
      )}
      <ul>
        <li>
          <Link href="/profile">Conta</Link>
        </li>
        <li>
          <Link href="/profile/orders?tab=1&q=all-orders__">Minhas Compras</Link>
        </li>
        <li>
          <Link href="/profile/messages">Centro de mensagens</Link>
        </li>
        <li>
          <Link href="/profile/address">Endereço</Link>
        </li>
        <li>
          <Link href="/profile/wishlist">Lista de desejos</Link>
        </li>
        {isAdmin && (
          <li>
            <RiAdminLine />
            <Link href="/admin/dashboard">Admin</Link>
          </li>
        )}
      </ul>
    </div>
        );
}