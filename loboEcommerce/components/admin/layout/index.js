import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideDialog } from "../../../store/DialogSlice";
import DialogModal from "../../dialogModal";
import Sidebar from "./sidebar";
import styles from "./styles.module.scss";

export default function Layout({ children }) {//children:enviar os dados para index
  const expandSidebar = useSelector((state) => state.expandSidebar);//const { expandSidebar } = useSelector((state) => ({ ...state }));
  const showSidebar = expandSidebar.expandSidebar;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(hideDialog());
  }, []);

  return (
    <div className={styles.layout}>
      <DialogModal />
      <Sidebar />
      <div
        style={{ marginLeft: `${showSidebar ? "280px" : "80px"}` }}//ajusta o layout e suas posiçoes
        className={styles.layout__main}
      >
        {children}
      </div>
    </div>
  );
}
