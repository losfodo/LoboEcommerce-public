import styles from "./styles.module.scss";
import Image from 'next/image';

export default function PaymentMethods() {
  return (
    <div className={`${styles.card} ${styles.cart__method}`}>
      <h2 className={styles.header}>Métodos de Pagamento</h2>
      <div className={styles.images}>
        <Image width={33} height={33} style={{ width: "auto", height: "auto" }} src="/images/payment/visa.webp" alt="" />
        <Image width={33} height={33} style={{ width: "auto", height: "auto" }} src="/images/payment/mastercard.webp" alt="" />
        <Image width={33} height={33} style={{ width: "auto", height: "auto" }} src="/images/payment/paypal.webp" alt="" />
      </div>
      <h2 className={styles.header}>Buyer Protection</h2>
      <div className={styles.protection}>
        <Image width={20} height={10} src="/images/protection.png" alt="" />
        {/* <img src="../../../images/protection.png" alt="" /> */}
        Obtenha reembolso total se o item não estiver conforme descrito ou se não for entregue.
      </div>
    </div>
  );
}
