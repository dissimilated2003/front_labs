import { applyMiddleware, createStore } from "redux";
import { editorReducer } from "./editorReducer";
import { defEditor } from "../data";
import { loadFromLocalStorage, saveToLocalStorage } from "../localStorage/localStorageUtils";
import { thunk } from "redux-thunk";

export const store = createStore(editorReducer, loadFromLocalStorage() ?? defEditor, applyMiddleware(thunk))

store.subscribe(() => {
    saveToLocalStorage(store.getState());
});
