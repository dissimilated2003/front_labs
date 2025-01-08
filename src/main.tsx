import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from './App.tsx'
import './index.css'
import { Provider } from "react-redux";
import { store } from "./store/reduxStore/storeActions.ts";
import { initHistory } from "./store/utilities/historyUndoRedo.ts";

const root = createRoot(document.getElementById('root')!)
root.render(
    <StrictMode>
        <Provider store={store}>
            <App history={initHistory(store)}/>
        </Provider>
    </StrictMode>,
)