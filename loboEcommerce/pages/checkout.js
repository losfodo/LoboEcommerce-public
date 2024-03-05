import { useState, useEffect } from "react";
import styles from "../styles/checkout.module.scss";
import { getSession } from "next-auth/react";
import User from "../models/User";
import Cart from "../models/Cart";
import db from "../utils/db";
import Header from "../components/cart/header";
import Shipping from "../components/checkout/shipping";
import Products from "../components/checkout/products";
import Payment from "../components/checkout/payment";
import Summary from "../components/checkout/summary";
import { useSession } from "next-auth/react";
export default function Checkout({ cart, user }) {
  // const { data: session } = useSession();
  // console.log('sessionsessionsessionsession', session);
  //const [selectedAddress, setSelectedAddress] = useState(user?.address || [];//antes que funcionava
  const [addresses, setAddresses] = useState(user?.address || []);
  console.log("aaaaaaaaaaaaaa addresses", addresses);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [totalAfterDiscount, setTotalAfterDiscount] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");
  useEffect(() => {
    let check = addresses.find((address) => address.active == true);
    if (check) {
      setSelectedAddress(check);
    } else {
      setSelectedAddress("");
    }
  }, [addresses]);
  console.log('sssssssssssssaaaaaaa selectedAddress', selectedAddress);
  return (
    <>
      <Header />
      {/* <span>{session?.user?.name}</span> */}
      <div className={`${styles.container} ${styles.checkout}`}>
        {/* teste {JSON.stringify(cart)} */}
        <div className={styles.checkout__side}>
          <Shipping
            user={user}
            // selectedAddress={selectedAddress}//antes que funcionava
            addresses={addresses}//antes que funcionava nao tinha esse agora tem
            // setSelectedAddress={setSelectedAddress}//antes que funcionava
            setAddresses={setAddresses}
          />
          <Products cart={cart} />
        </div>
        <div className={styles.checkout__side}>
          <Payment
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
          />
          <Summary
            totalAfterDiscount={totalAfterDiscount}
            setTotalAfterDiscount={setTotalAfterDiscount}
            user={user}
            cart={cart}
            paymentMethod={paymentMethod}
            selectedAddress={selectedAddress}
          />
        </div>
      </div>
    </>
  );
}
export async function getServerSideProps(context) {
  await db.connectDb();
  console.log('ddddddddddddddd getServerSideProps db terminal pt1',db);
  const session = await getSession(context);//dados do usuario
  // const session = context.req.user;
  // const users = await User.find().lean();
  // console.log('uuuuuuuuuuuuu usuarios terminal todos os usuarios',users);
  console.log('sssssssssssssss getServerSideProps session terminal pt2',session);
  if (!session) {
    console.log('ao possui session de usuario getServerSideProps',session);
    return {
      redirect: {
        destination: "/",//destination: "/", // Redirecionar para a página de login se não houver uma sessão
        permanent: false,
      },
    };
  }
  const user = await User.findById(session.user.id);//const user = await User.findById(session?.user?.id);//const user = await User.findById(session.user.id);
  console.log('uuuuuuuuuuuuuuuuu user getServerSideProps terminal user const user = await User.findById(session.user.id);', user);
  const cart = await Cart.findOne({ user: user?._id });//const cart = await Cart.findOne({ user: user._id });//dados da compra
  console.log('ccccccccccccccccc cart getServerSideProps checkout page terminal', cart);
  await db.disconnectDb();
  // if (!cart) {
  //   console.log('nao possui cart de cart getServerSideProps',cart);
  //   return {
  //     redirect: {
  //       destination: "/cart",//destination: "/cart",
  //     },
  //   };
  // }
  return {
    props: {
      cart: JSON.parse(JSON.stringify(cart)),
      user: JSON.parse(JSON.stringify(user)),
    },
  };
}
