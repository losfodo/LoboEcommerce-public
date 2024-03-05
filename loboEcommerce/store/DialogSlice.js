// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   show: false,
//   header: "",
//   msgs: [],
//   link: {
//     link: "",
//     link_text: "",
//   },
// };

// export const DialogSlice = createSlice({
//   name: "dialog",
//   initialState,
//   reducers: {
//     showDialog(state, action) {
//       state.show = true;
//       state.header = action.payload.header;
//       state.msgs = action.payload.msgs;
//       state.link = action.payload.link;
//     },
//     hideDialog(state, action) {
//       state.show = false;
//       state.header = "";
//       state.msgs = [];
//       state.link = {};
//     },
//   },
// });

// export const { showDialog, hideDialog } = DialogSlice.actions;

// export default DialogSlice.reducer;



//-------------------------------------------

/*
import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const initialState = {
  show: false,
  header: "",
  msgs: [],
  link: {
    link: "",
    link_text: "",
  },
};

export const DialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    showDialog(state, action) {
      state.show = true;
      state.header = action.payload.header;
      state.msgs = action.payload.msgs;
      state.link = action.payload.link;
    },
    hideDialog(state, action) {
      state.show = false;
      state.header = "";
      state.msgs = [];
      state.link = {};
    },
  },
});

export const { showDialog, hideDialog } = DialogSlice.actions;

export default DialogSlice.reducer;
*/
/*
// Seletor para obter o estado do diálogo
export const selectDialog = (state) => state.dialog;

// Seletor memoizado para obter o valor 'show' do estado do diálogo
export const selectDialogShow = createSelector(
  [selectDialog],
  (dialog) => dialog.show
);

// Seletor memoizado para obter o valor 'header' do estado do diálogo
export const selectDialogHeader = createSelector(
  [selectDialog],
  (dialog) => dialog.header
);

// Seletor memoizado para obter a lista de mensagens (msgs) do estado do diálogo
export const selectDialogMsgs = createSelector(
  [selectDialog],
  (dialog) => dialog.msgs
);

// Seletor memoizado para obter o objeto 'link' do estado do diálogo
export const selectDialogLink = createSelector(
  [selectDialog],
  (dialog) => dialog.link
);

*/
//------------------------------------
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  show: false,
  header: "",
  msgs: [],
  link: {
    link: "",
    link_text: "",
  },
};

export const DialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    showDialog(state, action) {
      state.show = true;
      state.header = action.payload.header;
      state.msgs = action.payload.msgs;
      state.link = action.payload.link;
    },
    hideDialog(state, action) {
      state.show = false;
      state.header = "";
      state.msgs = [];
      state.link = {};
    },
  },
});

export const { showDialog, hideDialog } = DialogSlice.actions;

export default DialogSlice.reducer;
