import styles from "./styles.module.scss";
import { BsHeart } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { updateCart } from "../../../store/cartSlice";
import { useState, useEffect } from "react";
import Image from 'next/image';
export default function Product({ product, selected, setSelected }) {
  const cart = useSelector((state) => state.cart);//const { cart } = useSelector((state) => ({ ...state }));
  console.log('cart product', cart);
  const [active, setActive] = useState();
  // console.log(active);
  useEffect(() => {
    const check = selected.find((p) => p._uid == product._uid);
    setActive(check);
  }, [selected, product._uid]);//}, [selected]);
  const dispatch = useDispatch();
  const updateQty = (type) => {
    let newCart = cart.cartItems.map((p) => {
      if (p._uid == product._uid) {
        return {
          ...p,
          qty: type == "plus" ? product.qty + 1 : product.qty - 1,
        };
      }
      return p;
    });
    dispatch(updateCart(newCart));
  };
  const removeProduct = (id) => {
    let newCart = cart.cartItems.filter((p) => {
      return p._uid != id;
    });
    dispatch(updateCart(newCart));
  };
  const handleSelect = () => {
    if (active) {
      setSelected(selected.filter((p) => p._uid !== product._uid));
    } else {
      setSelected([...selected, product]);
    }
  };
  return (
    <div className={`${styles.card} ${styles.product}`}>
      {product.quantity < 1 && <div className={styles.blur}></div>}
      <div className={styles.product__header}>
        {/* <Image width={16} height={18} style={{ width: "auto", height: "auto" }} src="/images/store.webp" alt="" /> */}
        <img src="../../../images/store.webp" alt="" />
        Loja Oficial Lobo Materiais de Construção
      </div>
      <div className={styles.product__image}>
        <div
          className={`${styles.checkbox} ${active ? styles.active : ""}`}
          onClick={() => handleSelect()}
        ></div>
        {/* <Image width={65} height={65} style={{ width: "auto", height: "auto" }} src={product.images[0].url} alt="" /> */}
        <img src={product.images[0].url} alt="" />
        <div className={styles.col}>
          <div className={styles.grid}>
            <h1>
              {product.name.length > 30
                ? `${product.name.substring(0, 30)}`
                : product.name}
            </h1>
            <div style={{ zIndex: "2" }}>
              <BsHeart />
            </div>
            <div
              style={{ zIndex: "2" }}
              onClick={() => removeProduct(product._uid)}
            >
              <AiOutlineDelete />
            </div>
          </div>
          <div className={styles.product__style}>
            <img src={product.color.image} alt="" />
            {product.size && <span>{product.size}</span>}
            {product.price && <span>{product.price.toFixed(2)}R$</span>}
            <MdOutlineKeyboardArrowRight />
          </div>
          <div className={styles.product__priceQty}>
            <div className={styles.product__priceQty_price}>
              <span className={styles.price}>
                {(product.price * product.qty).toFixed(2)}R$
              </span>
              {product.price !== product.priceBefore && (
                <span className={styles.priceBefore}>
                  {product.priceBefore}R$
                </span>
              )}
              {product.discount > 0 && (
                <span className={styles.discount}>-{product.discount}%</span>
              )}
            </div>
            <div className={styles.product__priceQty_qty}>
              <button
                disabled={active || product.qty < 2}//disabled={product.qty < 2}
                onClick={() => updateQty("minus")}
              >
                -
              </button>
              <span>{product.qty}</span>
              <button
                disabled={active || product.qty === product.quantity}//disabled={product.qty == product.quantity}
                onClick={() => updateQty("plus")}
              >
                +
              </button>
            </div>
          </div>
          <div className={styles.product__shipping}>
            {product.shipping
              ? `+${product.shipping}R$ Taxa de envio`
              : "Frete grátis"}
          </div>
          {product.quantity < 1 && (
            <div className={styles.notAvailable}>
              Este produto está esgotado, por favor adicione-o à sua lista de desejos, pode voltar a ter stock no futuro.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
