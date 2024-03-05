import { useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { FaMinus } from "react-icons/fa";
import styles from "../styles.module.scss";
import { useRouter } from "next/router";
import { Tooltip } from "@mui/material";
import Image from 'next/image';

export default function BrandsFilter({ brands, brandHandler, replaceQuery }) {
  const router = useRouter();
  const [show, setShow] = useState(true);
  return (
    <div className={styles.filter}>
      <h3>
      Marcas <span>{show ? <FaMinus /> : <BsPlusLg />}</span>
      </h3>
      {show && (
        <div className={styles.filter__sizes}>
          {brands.map((brand, i) => {
            // console.log('brands', brands);
            const check = replaceQuery("brand", brand);
            return (
              <Tooltip key={i}
              title={<h2>{brand}</h2>}
              placement="top"
              arrow
            >
              <button key={i}
              className={`${styles.filter__brand}  ${check.active ? styles.activeFilter : ""}`}
              onClick={() => brandHandler(check.result)}
              >
                {brand.toLowerCase().trim() === brand.toLowerCase().trim() ? (
                // <img src={`../../../images/brands/${brand.toLowerCase().trim()}.png`} alt={brand} />
                <Image src={`/images/brands/${brand.toLowerCase().trim()}.png`} alt={brand} width={45} height={45} style={{ width: "auto", height: "auto" }} />
              ) : (
                { brand }// <span className={styles.brandText}>{ brand }</span>
              )}
                {/* <img src={`../../../images/brands/${brand.toLowerCase().trim()}.png`} alt="" /> */}
              </button>
              </Tooltip>
            );
          })}
        </div>
      )}
    </div>
  );
}
