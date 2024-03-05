import { paymentMethods } from "../../../data/paymentMethods";
import { useState } from 'react';
import styles from "./styles.module.scss";

export default function Payment({ paymentMethod, setPaymentMethod, profile }) {
  const handlePaymentChange = (e) => {
    const selectedPaymentMethod = e.target.id;
    setPaymentMethod(selectedPaymentMethod);
  };
  return (
    <div className={styles.payment}>
      {!profile && (
        <div className={styles.header}>
          <h3>Forma de pagamento</h3>
        </div>
      )}
      {paymentMethods.map((pm) => (
        <label
          htmlFor={pm.id}
          key={pm.id}
          className={styles.payment__item}
          onClick={() => setPaymentMethod(pm.id)}
          style={{ background: `${paymentMethod == pm.id ? "#f5f5f5" : ""}` }}
        >
          <input
            type="radio"
            name="payment"
            id={pm.id}
            checked={paymentMethod == pm.id}
            onChange={handlePaymentChange}
          />
          <img src={`../../../images/checkout/${pm.id}.webp`} alt={pm.name} />
          <div className={styles.payment__item_col}>
            <span>Pague com {pm.name}</span>
            <p>
              {pm.images.length > 0
                ? pm.images.map((img, i) => (
                    <img key={i} src={`../../../images/payment/${img}.webp`} alt="" />
                  ))
                : pm.description}
            </p>
          </div>
        </label>
      ))}
    </div>
  );
}
