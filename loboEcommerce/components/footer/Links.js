import Link from "next/link";
import styles from "./styles.module.scss";

export default function Links() {
  return (
    <div className={styles.footer__links}>
      {links.map((link, i) => (
        <ul key={i}>
          {i === 0 ? (//i seria a contagem começando por 0
            <img src="../../../logo.png" alt=""/>
          ) : (//daqui pra frente possui heading
            <b>{link.heading}</b>
          )}
          {link.links.map((link, i) => (//link listados abaixo do cabeçarios
            <li key={i}>{/*necessario sempre ter uma key em array como map e outros */}
              <Link href={link.link}>{link.name}</Link>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}
const links = [//array q foi feito um map
  {
    heading: "Lobo Materiais de Construção",
    links: [
      {
        name: "Sobre nós",
        link: "",
      },
      {
        name: "Contate-nos",
        link: "",
      },
      {
        name: "Responsabilidade social",
        link: "",
      },
      {
        name: "",
        link: "",
      },
    ],
  },
  {
    heading: "AJUDA E SUPORTE",
    links: [
      {
        name: "Informação de Envio",
        link: "",
      },
      {
        name: "Devoluções",
        link: "",
      },
      {
        name: "Como pedir",
        link: "",
      },
      {
        name: "Como rastrear",
        link: "",
      },
      {
        name: "Guia de tamanho",
        link: "",
      },
    ],
  },
  {
    heading: "ATENDIMENTO AO CLIENTE",
    links: [
      {
        name: "Atendimento ao Cliente",
        link: "",
      },
      {
        name: "Termos e Condições",
        link: "",
      },
      {
        name: "Consumidores (transações)",
        link: "",
      },
      // {
      //   name: "Take our feedback survey",
      //   link: "",
      // },
    ],
  },
];
