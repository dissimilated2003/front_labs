import { createStore } from "redux";
import { editorReducer } from "./editorReducer";
import { defEditor } from "../data";
import { loadFromLocalStorage, saveToLocalStorage } from "../localStorage/localStorageUtils";

export const store = createStore(editorReducer, loadFromLocalStorage() ?? defEditor)

store.subscribe(() => {
    saveToLocalStorage(store.getState());
});
