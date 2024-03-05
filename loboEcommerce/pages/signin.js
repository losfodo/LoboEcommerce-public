import Header from "../components/header";
import Footer from "../components/footer";
import styles from "../styles/signin.module.scss";
import { BiLeftArrowAlt } from "react-icons/bi";
import Link from "next/link";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import LoginInput from "../components/inputs/loginInput";
import { useState } from "react";
import CircledIconBtn from "../components/buttons/circledIconBtn";
import {
  getCsrfToken,
  getProviders,
  getSession,
  signIn,
  // country,
} from "next-auth/react";
import axios from "axios";
import DotLoaderSpinner from "../components/loaders/dotLoader";
import Router from "next/router";
import Image from 'next/image';
const initialvalues = {
  login_email: "",
  login_password: "",
  name: "",
  email: "",
  password: "",
  conf_password: "",
  success: "",
  error: "",
  login_error: "",
};
export default function Signin({providers, callbackUrl, csrfToken}) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(initialvalues);
  const {
    login_email,
    login_password,
    name,
    email,
    password,
    conf_password,
    success,
    error,
    login_error,
  } = user;//todos os dados inclusos do usuario 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const loginValidation = Yup.object({
    login_email: Yup.string()
      .required("Email address is required.")
      .email("Please enter a valid email address."),
    login_password: Yup.string().required("Please enter a password"),
  });
  const registerValidation = Yup.object({
    name: Yup.string()
      .required("What's your name ?")
      .min(2, "First name must be between 2 and 16 characters.")
      .max(16, "First name must be between 2 and 16 characters.")
      .matches(/^[aA-zZ]/, "Numbers and special characters are not allowed."),// /[^a-zA-Z0-9]/g
    email: Yup.string()
      .required(
        "You'll need this when you log in and if you ever need to reset your password."
      )
      .email("Enter a valid email address."),
    password: Yup.string()
      .required(
        "Enter a combination of at least six numbers,letters and punctuation marks(such as ! and &)."
      )
      .min(6, "Password must be atleast 6 characters.")
      .max(36, "Password can't be more than 36 characters"),
    conf_password: Yup.string()
      .required("Confirm your password.")
      .oneOf([Yup.ref("password")], "Passwords must match."),
  });
  const signUpHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/auth/signup", {//forma de usar a api do next js pegando com axios
        name,
        email,
        password,
      });
      setUser({ ...user, error: "", success: data.message });
      setLoading(false);
      setTimeout(async () => {
        let options = {
          redirect: false,
          email: email,
          password: password,
        };
        // const res = await signIn("credentials", options); //removendo temporariamente
        Router.push("/");
      }, 2000);
    } catch (error) {
      setLoading(false);
      setUser({ ...user, success: "", error: error.response.data.message });
    }
  };
  const signInHandler = async () => {
    setLoading(true);
    let options = {
      redirect: false,
      email: login_email,
      password: login_password,
    };
    const res = await signIn("credentials", options);
    setUser({ ...user, success: "", error: "" });
    setLoading(false);
    if (res?.error) {
      setLoading(false);
      setUser({ ...user, login_error: res?.error });
    } else {
      return Router.push(callbackUrl || "/"); //return Router.push(callbackUrl || "/");
    }
  };
  const country = {
    name: "Brazil",
    flag: "../../../images/flags/flagBr.png",
  };
  // console.log(user);
  return (
    <>
      {loading && <DotLoaderSpinner loading={loading} />}
      <Header country={country} />{/* country={country} */}
      <div className={styles.login}>
        <div className={styles.login__container}>
          <div className={styles.login__header}>
            {/* <div className={styles.back__svg}>
              <BiLeftArrowAlt />
            </div> */}
            <span>
              Veja nossos produtos ! <Link href="/">Vá para a loja</Link>{/*We'd be happy to join us ! <Link href="/">Go Store</Link> */}
            </span>
          </div>
          <div className={styles.login__form}>
            <h1>Entrar</h1>
            <p>
              Acesse a sua conta.
            </p>
            <Formik enableReinitialize
            initialValues={{
              login_email,
              login_password,
            }}
            validationSchema={loginValidation}
            onSubmit={() => {
              signInHandler();
            }}
            >
              {(form) => (
                <Form method="post" action="/api/auth/signin/email">{/* method="post" action="/api/auth/signin/email" */}
                  <input
                    type="hidden"
                    name="csrfToken"
                    defaultValue={csrfToken}
                  />
                  <LoginInput
                    type="text"
                    name="login_email"
                    icon="email"
                    placeholder="Endereço de email"
                    autoComplete="on"
                    onChange={handleChange}
                  />
                  <LoginInput
                    type="password"
                    name="login_password"
                    icon="password"
                    placeholder="Senha"
                    onChange={handleChange}
                  />
                  <CircledIconBtn type="submit" text="Entrar" />
                  {login_error && (
                    <span className={styles.error}>{login_error}</span>
                  )}
                  <div className={styles.forgot}>
                    <Link href="/auth/forgot">Esqueceu sua senha ?</Link>
                  </div>
                </Form>
              )}
            </Formik>
            <div className={styles.login__socials}>
              <span className={styles.or}>Ou continue com</span>
              <div className={styles.login__socials_wrap}>
                {providers.map((provider) => {
                  console.log('providers.map:',providers);
                  if (provider.name == "Credentials") {
                    return;
                  }
                  return (
                    <div key={provider.name}>
                      <button
                        className={styles.social__btn}
                        onClick={() => signIn(provider.id)}
                      > 
                      <Image src={`/icons/${provider.name}.png`} alt="" width={30} height={25} style={{ width: "auto", height: "auto" }} />
                        {/* <Image src={`../../icons/${provider.name}.png`} alt="" width={50} height={50} /> */}
                        Faça login com {provider.name}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.login__container}>
          <div className={styles.login__form}>
            <h1>Inscrever-se</h1>
            <p>
              Crie já sua conta.
            </p>
            <Formik
              enableReinitialize
              initialValues={{
                name,
                email,
                password,
                conf_password,
              }}
              validationSchema={registerValidation}
              onSubmit={() => {
                signUpHandler();
              }}
            >
              {(form) => (
                <Form>
                  <LoginInput
                    type="text"
                    name="name"
                    icon="user"
                    placeholder="Nome completo"
                    autoComplete="on"
                    onChange={handleChange}
                  />
                  <LoginInput
                    type="text"
                    name="email"
                    icon="email"
                    placeholder="Endereço de email"
                    autoComplete="on"
                    onChange={handleChange}
                  />
                  <LoginInput
                    type="password"
                    name="password"
                    icon="password"
                    placeholder="Senha"
                    onChange={handleChange}
                  />
                  <LoginInput
                    type="password"
                    name="conf_password"
                    icon="password"
                    placeholder="Digite novamente sua senha"
                    onChange={handleChange}
                  />
                  <CircledIconBtn type="submit" text="Inscrever-se" />
                </Form>
              )}
            </Formik>
            <div>
              {success && <span className={styles.success}>{success}</span>}
            </div>
            <div>{error && <span className={styles.error}>{error}</span>}</div>
          </div>
        </div>
      </div>
      <Footer country={country} />{/* country="Brazil" */}
    </>
  );
}

export async function getServerSideProps(context) {
  const { req, query } = context;

  const session = await getSession({ req });
  const { callbackUrl } = query;
  // if (session) {
  //   return {
  //     redirect: {
  //       destination: "/",
  //       permanent: false,
  //     },
  //   };
  // }
  if (session) {
    return {
      redirect: {
        destination: callbackUrl || "//signin",//destination: callbackUrl,
      },
    };
  }
  const csrfToken = await getCsrfToken(context);//getCsrfToken é apenas a leitura de um cookie httponly (É gerado no lado do servidor ), que não pode ser escrito no lado do cliente.
  // const providers = Object.values(await getProviders());
  const providers = (await getProviders()) || {};
  const providerValues = Object.values(providers);
  // console.log('providers Object.values:',providers);
  return {
    props: {
      providers: providerValues,
      csrfToken: csrfToken || null,
      callbackUrl: callbackUrl || null,
      // providers,
      // csrfToken,
      // callbackUrl,
    },
  };
}