import Layout from "../../../components/admin/layout";
import styles from "../../../styles/dashboard.module.scss";
import User from "../../../models/User";
import Order from "../../../models/Order";
import Product from "../../../models/Product";
import Head from "next/head";
import { useSession } from "next-auth/react";
import Dropdown from "../../../components/admin/dashboard/dropdown";
import Notifications from "../../../components/admin/dashboard/notifications";
import { TbUsers } from "react-icons/tb";
import { SlHandbag, SlEye } from "react-icons/sl";
import { SiProducthunt } from "react-icons/si";
import { GiTakeMyMoney } from "react-icons/gi";
import Image from 'next/image';
import Link from "next/link";
// import { toast } from "react-toastify";//apenas um test
export default function Dashboard({ users, orders, products }) {
  // console.log('orders:', orders);
  const { data: session } = useSession();
  return (
    <div>
      <Head>
        <title>Shoppay - Admin Dashboard</title>
      </Head>
      <Layout>
        {/* <button onClick={()=>toast.error('Every work')}>toastify</button> */}
        <div className={styles.header}>
          <div className={styles.header__search}>
            <label htmlFor="search">
              <input id="search" type="text" placeholder="Search here..." />
            </label>
          </div>
          <div className={styles.header__right}>
            <Dropdown userImage={session?.user?.image} />
            <Notifications />
          </div>
        </div>
        <div className={styles.cards}>
          <div className={styles.card}>
            <div className={styles.card__icon}>
              <TbUsers />
            </div>
            <div className={styles.card__infos}>
              <h4>+{users.length}</h4>
              <span>Users</span>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.card__icon}>
              <SlHandbag />
            </div>
            <div className={styles.card__infos}>
              <h4>+{orders.length}</h4>
              <span>Orders</span>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.card__icon}>
              <SiProducthunt />
            </div>
            <div className={styles.card__infos}>
              <h4>+{products.length}</h4>
              <span>Products</span>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.card__icon}>
              <GiTakeMyMoney />
            </div>
            <div className={styles.card__infos}>
              <h4>+{orders.reduce((a, val) => a + val.total, 0).toFixed(2)}$</h4>
              <h5>
                -
                {orders
                  .filter((o) => !o.isPaid)
                  .reduce((a, val) => a + val.total, 0).toFixed(2)}
                $ Unpaid yet.
              </h5>
              <span>Total Earnings</span>
            </div>
          </div>
        </div>
        <div className={styles.data}>
          <div className={styles.orders}>
            <div className={styles.heading}>
              <h2>Recent Orders</h2>
              <Link href="/admin/dashboard/orders">View All</Link>
            </div>
            <table>
              <thead>
                <tr>
                  <td>Name</td>
                  <td>Total</td>
                  <td>Payment</td>
                  <td>Status</td>
                  <td>View</td>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, i) => (
                  <tr key={i}>
                    <td>{order.user.name}</td>
                    <td>{order.total} $</td>
                    <td>
                      {order.isPaid ? (
                        // <Image src="../../../images/verified.webp" alt="" />
                        <Image src="../../../images/verified.webp" alt="" width={20} height={20} style={{ width: "auto", height: "auto" }}/>
                      ) : (
                        // <Image src="../../../images/unverified1.png" alt="" />
                        <Image src="/images/unverified1.png" alt="" width={20} height={20} style={{ width: "auto", height: "auto" }}/>
                      )}
                    </td>
                    <td>
                      <div
                        className={`${styles.status} ${
                          order.status == "Not Processed"
                            ? styles.not_processed
                            : order.status == "Processing"
                            ? styles.processing
                            : order.status == "Dispatched"
                            ? styles.dispatched
                            : order.status == "Cancelled"
                            ? styles.cancelled
                            : order.status == "Completed"
                            ? styles.completed
                            : ""
                        }`}
                      >
                        {order.status}
                      </div>
                    </td>
                    <td>
                      <Link href={`/order/${order._id}`}>
                        <SlEye />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={styles.users}>
            <div className={styles.heading}>
              <h2>Recent Users</h2>
              <Link href="/admin/dashboard/users">View All</Link>
            </div>
            <table>
              <tbody>
                {users.map((user, i) => (
                  <tr key={i}>
                    <td className={styles.user}>
                      <div className={styles.user__img}>
                        <Image src={user.image} alt="" width={30} height={25} />
                      </div>
                      <div>{/*<td> */}
                        <h4>{user.name}</h4>
                        <span>{user.email}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export async function getServerSideProps({ req }) {
  const users = await User.find().lean();
  const orders = await Order.find()
    .populate({ path: "user", model: User })
    .lean();
  const products = await Product.find().lean();
  return {
    props: {
      users: JSON.parse(JSON.stringify(users)),
      orders: JSON.parse(JSON.stringify(orders)),
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
