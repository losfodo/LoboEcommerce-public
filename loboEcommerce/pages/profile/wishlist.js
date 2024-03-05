import { getSession } from "next-auth/react";
import Layout from "../../components/profile/layout";
import User from "../../models/User";
import styles from "../../styles/profile.module.scss";
import { useState } from "react";
import { FiExternalLink } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import Link from "next/link";

export default function Whishlists({ user, tab }) {
  const [wishlists, setWishlist] = useState(user.wishlist.wishlist);
  // console.log('wishlists', wishlists);
  // console.log('user', user);
  return (
    <Layout session={user.user} tab={tab}>
      <div className={styles.header}>
        <h1>MY WISHLIST não finalizado ainda</h1>
      </div>
      <div className={styles.orders}>
        <table>
          <thead>
            <tr>
              <td>view</td>
              <td>wishlist id</td>
              <td>Product Name</td>
              {/* <td>Product</td> */}
              <td>Image Product</td>
              {/* <td>style</td> */}
              <td>Remover</td>
            </tr>
          </thead>
          <tbody>
            {wishlists.map((order, i) => (
              <tr key={i}>
                <td>
                  {/* <Link href={`/product/${order.productName}?style=${order.style}`}> */}
                    <FiExternalLink />
                  {/* </Link> */}
                </td>
                <td>{order._id}</td>
                <td>Nome do produto</td>
                {/* <td>{order.product}</td> */}
                <td className={styles.orders__images}>
                  imagem do produto
                </td>
                {/* <td>{order.style}</td> */}
                <td><AiFillDelete /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  const { query, req } = ctx;
  const session = await getSession({ req });
  const tab = query.tab || 0;
  //--------------
  const wishlist = await User.findById(session.user.id).select("wishlist").lean();
  // console.log(wishlist);
  return {
    props: {
      user: {
        user: session.user,
        wishlist: JSON.parse(JSON.stringify(wishlist)),
      },
      tab,
    },
  };
}
