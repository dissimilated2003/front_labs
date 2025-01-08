import { useDispatch } from "react-redux";
import actionCreators from "../reduxStore/actionCreators";
import { bindActionCreators } from "redux";

export const useAppActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(actionCreators, dispatch)
}