import { legacy_createStore as createStore } from "redux";
import { editorReducer } from "./editorReducer";

export const store = createStore(editorReducer)