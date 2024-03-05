import styles from "./styles.module.scss";
import { MdSecurity } from "react-icons/md";
import { BsSuitHeart } from "react-icons/bs";
import { RiAccountPinCircleLine, RiArrowDropDownFill } from "react-icons/ri";
import Link from "next/link";
import { useState } from "react";
import UserMenu from "./UserMenu";
import { useSession } from "next-auth/react";//para pegar os dados do login 

export default function Top({ country }) {
    const { data: session } = useSession();//se esta logado ou não
    const [visible, setVisible] = useState(false);
    //const [session, session1] = useState(true);//temporario..
    return (
      <div className={styles.top}>
        <div className={styles.top__container}>
          <div></div>
          <ul className={styles.top__list}>
            <li className={styles.li}>
              <img src={country?.flag} alt="" />{/*{country?.flag} */}
              <span>{country?.name} / R$</span>
            </li>
            <li className={styles.li}>
              <MdSecurity />
              <span>Proteção ao Comprador</span>
            </li>
            <li className={styles.li}>
              <span>Atendimento ao Cliente</span>
            </li>
            <li className={styles.li}>
              <span>Ajuda</span>
            </li>
            <li className={styles.li}>
              {/* <BsSuitHeart/> */}
              ❤️
              <Link href="/profile/wishlist">
                <span>Lista de desejos</span>
              </Link>
            </li>
            <ul
              className={styles.li}
              onMouseOver={() => setVisible(true)}//ao passar o mouse mostra foto com signup do usermenu
              onMouseLeave={() => setVisible(false)}
            >
              {session ? (
                <li className={styles.li}>
                  <div className={styles.flex}>
                    <img src={session?.user?.image} alt="" />{/*src="https://i.pinimg.com/originals/38/c9/ce/38c9cedd2bcae7c99d98a1be48b60eac.png" */}
                    <span>{session?.user?.name}</span>
                    <RiArrowDropDownFill />
                  </div>
                </li>
               ) : ( 
                <li className={styles.li}>
                  <div className={styles.flex}>
                    <RiAccountPinCircleLine />
                    <span>Conta</span>
                    <RiArrowDropDownFill />
                  </div>
                </li>
               )} 
              {visible && <UserMenu session={session} />}{/*{visible && <UserMenu session={session} />} */}
            </ul>
          </ul>
        </div>
      </div>
    );
  }