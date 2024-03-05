import styles from "./styles.module.scss";

export default function Checkout({
  subtotal,
  shippingFee,
  total,
  selected,
  saveCartToDbHandler,
}) {
  return (
    <div className={`${styles.cart__checkout} ${styles.card}`}>
      <h2>Resumo do pedido</h2>
      <div className={styles.cart__checkout_line}>
        <span>Subtotal</span>
        <span>R${subtotal}</span>
      </div>
      <div className={styles.cart__checkout_line}>
        <span>Envio</span>
        <span>+{shippingFee}$</span>
      </div>
      <div className={styles.cart__checkout_total}>
        <span>Total</span>
        <span>R${total}</span>
      </div>
      <div className={styles.submit}>
        <button
          disabled={selected.length == 0}
          style={{
            background: `${selected.length == 0 ? "#eee" : ""}`,
            cursor: `${selected.length == 0 ? "not-allowed" : ""}`,
          }}
          onClick={() => saveCartToDbHandler()}
        >
          Continuar
        </button>
      </div>
    </div>
  );
}
