import styles from "../../styles/order.module.scss";
import Header from "../../components/header";
import OrderModel from "../../models/Order";
import User from "../../models/User";
import { IoIosArrowForward } from "react-icons/io";
import db from "../../utils/db";
import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useReducer, useEffect } from "react";
import axios from "axios";
import StripePayment from "../../components/stripePayment";
import { getSession } from "next-auth/react";

function reducer(state, action) {
  switch (action.type) {
    case "PAY_REQUEST":
      return { ...state, loading: true };
    case "PAY_SUCCESS":
      return { ...state, loading: false, success: true };
    case "PAY_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "PAY_RESET":
      return { ...state, loading: false, success: false, error: false };
  }
}
export default function Order({
  orderData,
  paypal_client_id,
  stripe_public_key,
}) {
  const country = {
    name: "Brazil",
    flag: "../../../images/flags/flagBr.png",
  };
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  //const [{loading, error, success}] = useReducer(reducer, {loading: true, order: {}, error: ""});  
  const [dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
    success: "",
  });

  useEffect(() => {
    if (!orderData._id) {
      dispatch({
        type: "PAY_RESET",
      });
    } else {
      paypalDispatch({
        type: "resetOptions",
        value: {
          "client-id": paypal_client_id,
          currency: "BRL",//currency: "USD",
        },
      });
      paypalDispatch({
        type: "setLoadingStatus",
        value: "pending",
      });
    }
  }, [Order]);// }, [Order]); //}, [dispatch, orderData._id, paypalDispatch, paypal_client_id]);
    function createOrderHanlder(data, actions) {
      return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              //currency_code: "BRL", // Adicione a moeda do pedido
              value: orderData.total,
            },
          },
        ],
      })
      .then((order_id) => {
        return order_id;
      });
    }
  function onApproveHandler(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        dispatch({ type: "PAY_REQUEST" });
        const { data } = await axios.put(
          `/api/order/${orderData._id}/pay`,
          details
        );
        dispatch({ type: "PAY_SUCCESS", payload: data });
      } catch (error) {
        dispatch({ type: "PAY_ERROR", payload: error });
      }
    });
  }
  function onErroHandler(error) {
    console.log(error);
  }
  return (
    <>
      <Header country={country} />
      <div className={styles.order}>
        <div className={styles.container}>
          <div className={styles.order__infos}>
            <div className={styles.order__header}>
              <div className={styles.order__header_head}>
                Home <IoIosArrowForward /> Orders <IoIosArrowForward /> ID{" "}
                {orderData._id}
              </div>
              <div className={styles.order__header_status}>
              Status do Pagamento  :{" "}
                {orderData.isPaid ? (
                  <img src="../../../images/verified.png" alt="paid" />
                ) : (
                  <img src="../../../images/unverified.png" alt="paid" />
                )}
              </div>
              <div className={styles.order__header_status}>
              Status do Pedido :
                <span
                  className={
                    orderData.status === "Not Processed"
                      ? styles.not_processed
                      : orderData.status == "Processing"
                      ? styles.processing
                      : orderData.status == "Dispatched"
                      ? styles.dispatched
                      : orderData.status == "Cancelled"
                      ? styles.cancelled
                      : orderData.status == "Completed"
                      ? styles.completed
                      : ""
                  }
                >
                  {orderData.status}
                </span>
              </div>
            </div>
            <div className={styles.order__products}>
              {orderData.products.map((product) => (
                <div className={styles.product} key={product._id}>
                  <div className={styles.product__img}>
                    <img src={product.image} alt={product.name} />
                  </div>
                  <div className={styles.product__infos}>
                    <h1 className={styles.product__infos_name}>
                      {product.name.length > 30
                        ? `${product.name.substring(0, 30)}...`
                        : product.name}
                    </h1>
                    <div className={styles.product__infos_style}>
                      <img src={product.color.image} alt="" /> / {product.size}
                    </div>
                    <div className={styles.product__infos_priceQty}>
                      {product.price}R$ x {product.qty}
                    </div>
                    <div className={styles.product__infos_total}>
                      {product.price * product.qty}R$
                    </div>
                  </div>
                </div>
               ))}
              <div className={styles.order__products_total}>
                {orderData.couponApplied ? (
                  <>
                    <div className={styles.order__products_total_sub}>
                      <span>Subtotal</span>
                      <span>{orderData.totalBeforeDiscount}R$</span>
                    </div>
                    <div className={styles.order__products_total_sub}>
                      <span>
                      Cupom Aplicado <em>({orderData.couponApplied})</em>{" "}
                      </span>
                      <span>
                        -
                        {(
                          orderData.totalBeforeDiscount - orderData.total
                        ).toFixed(2)}
                        R$
                      </span>
                    </div>
                    <div className={styles.order__products_total_sub}>
                      <span>Preço do Imposto</span>
                      <span>+{orderData.taxPrice}R$</span>
                    </div>
                    <div
                      className={`${styles.order__products_total_sub} ${styles.bordertop}`}
                    >
                      <span>TOTAL A PAGAR</span>
                      <b>{orderData.total}R$</b>
                    </div>
                  </>
                ) : (
                  <>
                    <div className={styles.order__products_total_sub}>
                      <span>Preço do Imposto</span>
                      <span>+{orderData.taxPrice}R$</span>
                    </div>
                    <div
                      className={`${styles.order__products_total_sub} ${styles.bordertop}`}
                    >
                      <span>TOTAL A PAGAR</span>
                      <b>{orderData.total}R$</b>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className={styles.order__actions}>
            <div className={styles.order__address}>
              <h1>Pedido do Cliente</h1>
              <div className={styles.order__address_user}>
                <div className={styles.order__address_user_infos}>
                  <img src={orderData.user.image} alt="" />
                  <div>
                    <span>{orderData.user.name}</span>
                    <span>{orderData.user.email}</span>
                  </div>
                </div>
              </div>
              <div className={styles.order__address_shipping}>
                <h2>Endereço para Envio</h2>
                <span>
                  {orderData.shippingAddress.firstName}{" "}
                  {orderData.shippingAddress.lastName}
                </span>
                <span>{orderData.shippingAddress.address1}</span>
                <span>{orderData.shippingAddress.address2}</span>
                <span>
                  {orderData.shippingAddress.state},
                  {orderData.shippingAddress.city}
                </span>
                <span>{orderData.shippingAddress.zipCode}</span>
                <span>{orderData.shippingAddress.country}</span>
              </div>
              <div className={styles.order__address_shipping}>
                <h2>Endereço de Cobrança</h2>
                <span>
                  {orderData.shippingAddress.firstName}{" "}
                  {orderData.shippingAddress.lastName}
                </span>
                <span>{orderData.shippingAddress.address1}</span>
                <span>{orderData.shippingAddress.address2}</span>
                <span>
                  {orderData.shippingAddress.state},
                  {orderData.shippingAddress.city}
                </span>
                <span>{orderData.shippingAddress.zipCode}</span>
                <span>{orderData.shippingAddress.country}</span>
              </div>
            </div>
            {!orderData.isPaid && (
              <div className={styles.order__payment}>
                {orderData.paymentMethod == "paypal" && (
                    <div>
                    {isPending ? (
                        <span>loading...</span>
                    ) : (
                        // <PayPalScriptProvider options={{ "client-id": "seu-client-id" }}>
                      <PayPalButtons
                        createOrder={createOrderHanlder}
                        onApprove={onApproveHandler}
                        onError={onErroHandler}
                      ></PayPalButtons>
                    //    </PayPalScriptProvider>
                    )}
                  </div>
                )}
                {orderData.paymentMethod == "credit_card" && (
                  <StripePayment
                    total={orderData.total}
                    order_id={orderData._id}
                    stripe_public_key={stripe_public_key}
                  />
                )}
                {orderData.paymentMethod == "cash" && (
                  <div className={styles.cash}>dinheiro ou no boleto entraremos em contato logo em horario util, Obrigado!!  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  db.connectDb();
  const { query } = context;
  const id = query.id;
  const order = await OrderModel.findById(id)
   .populate({ path: "user", model: User })//.populate("user")
    .lean();
    // console.log('aparece no terminal e nao no inspecionar order ->', order);
  let paypal_client_id = process.env.PAYPAL_CLIENT_ID;
  // console.log('aparece paypal_client_id ->', paypal_client_id);
  let stripe_public_key = process.env.STRIPE_PUBLIC_KEY;
  db.disconnectDb();
  return {
    props: {
    orderData: JSON.parse(JSON.stringify(order)),//chama os dados de orderData para popular no projeto
      paypal_client_id,
      stripe_public_key,
    },
  };
}
