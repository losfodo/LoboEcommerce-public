import Link from "next/link";
import styles from "./styles.module.scss";
import { RiSearch2Line } from "react-icons/ri";
import { FaOpencart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Main({ searchHandler }) {
  const router = useRouter();
  const [query, setQuery] = useState(router.query.search || "");
  const cart = useSelector((state) => state.cart);//const { cart } = useSelector((state) => ({ ...state }));
  // console.log('cart header', cart.cartItems.length);
    const handleSearch = (e) => {//evita procedimento padrão de formulario
      e.preventDefault();
      if (router.pathname !== "/") {//if (router.pathname !== "/browse") {
        if (query.length > 1) {
          router.push(`/?search=${query}`);//router.push(`/browse?search=${query}`);
        }
      } else {
        searchHandler(query);
      }
    };
    return (
      <div className={styles.main}>
        <div className={styles.main__container}>
          <Link href="/">
            <div className={styles.logo}>
              <img src="../../../logo.png" alt="" />{/*sem a pasta src no projeto volta até o public para pegar imagens videos o que for */}
            </div>
          </Link>
          <form onSubmit={(e) => handleSearch(e)} className={styles.search} id="myform">
            <input
              type="text"
              placeholder="Pesquisar produto..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              name="foo"
            />
            <button type="submit" className={styles.search__icon}>
              <RiSearch2Line />
            </button>
          </form>
          <Link href="/cart">
            <div className={styles.cart}>{/*<a></a>nao pode mais ser usado troca para div ou p */}
              <FaOpencart />
              <span>{cart.cartItems.length}</span>
            </div>
          </Link>
        </div>
      </div>
    );
  }