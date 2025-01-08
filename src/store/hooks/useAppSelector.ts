import { TypedUseSelectorHook, useSelector } from "react-redux";
import { editorReducer } from "../reduxStore/editorReducer";

type RootState = ReturnType<typeof editorReducer>

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector