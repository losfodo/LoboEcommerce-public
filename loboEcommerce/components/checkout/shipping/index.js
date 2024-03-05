import styles from "./styles.module.scss";
import { useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import "yup-phone";
import ShippingInput from "../../inputs/shippingInput";
import { InputLabel, Select } from "@mui/material";//{ FormControl, InputLabel, MenuItem, Select }
import { countries } from "../../../data/countries";
import SingularSelect from "../../selects/SingularSelect";
import { saveAddress, changeActiveAddress, deleteAddress } from "../../../requests/user";//changeActiveAddress, deleteAddress, saveAddress
import { FaIdCard } from "react-icons/fa";
import { GiPhone } from "react-icons/gi";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoMdArrowDropupCircle } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { FormControl, MenuItem } from "@mui/material";
const initialValues = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  state: "",
  city: "",
  zipCode: "",
  address1: "",
  address2: "",
  country: "",
};
export default function Shipping({ user, addresses, setAddresses, profile }) {//selectedAddresses, setSelectedAddresses ({ user, addresses, setAddresses, profile }) 
  // console.log('1addresses ->', addresses);
  // const [addresses, setAddresses] = useState(user?.address || []);//antes que funcionava
  const [shipping, setShipping] = useState(initialValues);
  const [visible, setVisible] = useState(user?.address.length ? false : true);
  // const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  const {
    firstName,
    lastName,
    phoneNumber,
    state,
    city,
    zipCode,
    address1,
    address2,
    country,
  } = shipping;
  const validate = Yup.object({
    firstName: Yup.string()
      .required("First name is required.")
      .min(3, "First name must be atleast 3 characters long.")
      .max(20, "First name must be less than 20 characters long."),
    lastName: Yup.string()
      .required("Last name is required.")
      .min(8, "Last name must be atleast 3 characters long.")
      .max(20, "Last name must be less than 20 characters long."),
    phoneNumber: Yup.string()//.matches(phoneRegExp, 'Phone number is not valid')
      .required("Phone number is required.")
      //.phone()//.phone()
      .min(8, "Phone number must be atleast 8 characters long.")
      .max(30, "Phone number must be less than 20 characters long."),
    state: Yup.string()
      .required("State name is required.")
      .min(2, "State name should contain 2-60 characters..")
      .max(60, "State name should contain 2-60 characters."),
    city: Yup.string()
      .required("City name is required.")
      .min(2, "City name should contain 2-60 characters.")
      .max(60, "City name should contain 2-60 characters."),
    zipCode: Yup.string()
      .required("ZipCode/Postal is required.")
      .min(2, "ZipCode/Postal should contain 2-30 characters..")
      .max(30, "ZipCode/Postal should contain 2-30 characters."),
    address1: Yup.string()
      .required("Address Line 1 is required.")
      .min(5, "Address Line 1 should contain 5-100 characters.")
      .max(100, "Address Line 1 should contain 5-100 characters."),
    address2: Yup.string()
      .min(5, "Address Line 2 should contain 5-100 characters.")
      .max(100, "Address Line 2 should contain 5-100 characters."),
    country: Yup.string().required("Country name is required."),
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setShipping({ ...shipping, [name]: value });
  };
  const saveShippingHandler = async () => {
    const res = await saveAddress(shipping);//const res = await saveAddress(shipping, user._id);
    // console.log('salvar endereço cadastro ->', res);
    setAddresses([...addresses, res])//setAddresses(res.addresses);//setAddresses([...addresses, res]); //antes que funcionava
    // console.log('salvar endereço cadastro res ->', res);
    //setSelectedAddress(res);
    // console.log('salvar endereço cadastro addresses ->', ...addresses);
    window.location.reload();//temporario até resolver essa parte
  };
  const changeActiveHandler = async (id) => {
    const res = await changeActiveAddress(id);
    setAddresses(res.addresses);//setAddresses(res.addresses);
    // console.log('changeActiveHandler addresses ->', addresses);
    window.location.reload();//temporario até resolver essa parte
  };
  const deleteHandler = async (id) => {
    const res = await deleteAddress(id);
    setAddresses(res.addresses);
  };
  return (
    <div className={styles.shipping}>
      {!profile && (
        <div className={styles.header}>
          <h3>Endereço e Informações de envio</h3>
        </div>
      )}
      <div className={styles.addresses}>
        {addresses && addresses.length > 0 && addresses.map((address, i) => (//{addresses.map((address, i) => (//
          <div key={i} style={{ position: "relative" }}>
            <div
              className={styles.address__delete}
              onClick={() => deleteHandler(address._id)}
            >
              <IoIosRemoveCircleOutline />
            </div>
            <div
              className={`${styles.address} ${address.active && styles.active}`}//className={`${styles.address} ${address.active && styles.active}`},, className={`${styles.address} ${!selectedAddress ? address.active && styles.active : selectedAddress == address && styles.active}`}//antes que funcionava
              key={address._id}
              onClick={() => changeActiveHandler(address._id)}
            >
              <div className={styles.address__side}>
              <img src={profile ? user.user.image : user.image} alt="" />{/* <img src={profile ? user.user.image : user.image} alt="" /> <img src={user.image} alt="" /> */}
              </div>
              <div className={styles.address__col}>
                <span>
                  <FaIdCard />
                  {address.firstName && address.firstName.toUpperCase()}{" "}{/*{address.firstName.toUpperCase()}{" "} */}
                  {address.lastName && address.lastName.toUpperCase()}{/*{address.lastName.toUpperCase()} */}
                </span>
                <span>
                  <GiPhone />
                  {address.phoneNumber}
                </span>
              </div>
              <div className={styles.address__col}>
                <span>
                  <FaMapMarkerAlt />
                  {address.address1}
                </span>
                <span>{address.address2}</span>
                <span>
                  {address.city},{address.state},{address.country}
                </span>
                <span>{address.zipCode}</span>
              </div>
              <span
                className={styles.active__text}
                style={{
                  display: `${!address.active && "none"}`,//display: `${!address.active && "none"}`,//${!selectedAddress ? address.active && "none" : selectedAddress !== address && "none"}
                }}
              >
                Ativo (Local onde será entregado o produto)
              </span>
            </div>
          </div>
        ))}
      </div>
      <button className={styles.hide_show} onClick={() => setVisible(!visible)}>
        {visible ? (
          <span>
            <IoMdArrowDropupCircle style={{ fontSize: "2rem", fill: "#222" }} />
          </span>
        ) : (
          <span>
            ADICIONAR NOVO ENDEREÇO <AiOutlinePlus />
          </span>
        )}
      </button>
      {visible && (
        <Formik
          enableReinitialize
          initialValues={{
            firstName,
            lastName,
            phoneNumber,
            state,
            city,
            zipCode,
            address1,
            address2,
            country,
          }}
          validationSchema={validate}
          onSubmit={() => {
            saveShippingHandler();
          }}
        >
          {(formik) => (
            <Form>
              {/* <FormControl className={styles.select}>
                <InputLabel id="demo-simple-select-helper-label">Country</InputLabel>
                <Select labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={country}
                name="country"
                onChange={handleChange}
                autoComplete="off"
                htmlFor="demo-simple-select-helper">
                  {countries.map((country)=>(
                    <MenuItem value={country} key={country.name}>{country.name}</MenuItem>
                  ))}
                </Select>
              </FormControl> */}
              <SingularSelect
                name="country"
                value={country}
                placeholder="*País"
                handleChange={handleChange}
                data={countries}
              />
              <div className={styles.col}>
                <ShippingInput
                  name="firstName"
                  placeholder="*Primeiro Nome"
                  onChange={handleChange}
                  autoComplete="given-name"
                />
                <ShippingInput
                  name="lastName"
                  placeholder="*Sobrenome"
                  onChange={handleChange}
                  autoComplete="family-name"
                />
              </div>
              <div className={styles.col}>
                <ShippingInput
                  name="state"
                  placeholder="*Estado"
                  onChange={handleChange}
                  autoComplete="address-level1"
                />
                <ShippingInput
                  name="city"
                  placeholder="*Cidade"
                  onChange={handleChange}
                  autoComplete="address-level2"
                />
              </div>
              <ShippingInput
                name="phoneNumber"
                placeholder="*Número de telefone"
                onChange={handleChange}
                autoComplete="tel"
              />
              <ShippingInput
                name="zipCode"
                placeholder="*Código Postal/CEP"
                onChange={handleChange}
                autoComplete="postal-code"
              />
              <ShippingInput
                name="address1"
                placeholder="Endereço 1"
                onChange={handleChange}
                autoComplete="address-line1"
              />
              <ShippingInput
                name="address2"
                placeholder="Endereço 2"
                onChange={handleChange}
                autoComplete="address-line2"
              />
              <button type="submit">Salvar endereço</button>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
}
