import { configureStore } from "@reduxjs/toolkit";//importando as dependencias do redux no index store
import { combineReducers } from "redux";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import cart from "./cartSlice";
import expandSidebar from "./ExpandSlice";
import dialog from "./DialogSlice";
const reducers = combineReducers({ cart, expandSidebar, dialog });//({ cart, expandSidebar, dialog }); junta varios reduces para uso

const config = {
  key: "root",
  storage,
};

const reducer = persistReducer(config, reducers);//persistReducer:configuração de "migração" de propósito geral que será chamada após obter o estado armazenado

const store = configureStore({
  reducer: reducer,
  devTools: process.env.NODE_ENV !== "production",//para indicar se um ambiente específico é um ambiente de produção ou de desenvolvimento
  middleware: [thunk],//O middleware Redux Thunk permite que você escreva criadores de ações que retornam uma função em vez de uma ação . A conversão pode ser usada para atrasar o envio de uma ação ou para despachar somente se uma determinada condição for atendida. A função interna recebe os métodos store dispatch e getState como parâmetros.
});

export default store;

//------------------------------------

/*import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import cart from "./cartSlice";
import { createSelector } from 'reselect'; // Importe createSelector do reselect

const reducers = combineReducers({ cart });

const config = {
  key: "root",
  storage,
};

const reducer = persistReducer(config, reducers);

const store = configureStore({
  reducer: reducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

// Agora, crie seletores memoizados para acessar dados do estado de cart, por exemplo:
export const selectCartState = (state) => state.cart;
export const selectCartItems = createSelector([selectCartState], (cart) => cart.cartItems);
export const selectCartItemCount = createSelector([selectCartItems], (cartItems) => cartItems.length);

export default store;*/