import styles from './App.module.css'
import { SlidesList } from './views/SlideList/SlideList'
import { TopPanel } from './views/TopPanel/TopPanel'
import { ToolBar } from './views/ToolBar/ToolBar'
import { Workspace } from './views/Workspace/WorkSpace'
import { HistoryContext } from './store/hooks/historyContext'
import { HistoryType } from './store/utilities/historyUndoRedo'
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router";
import { Player } from './views/Player/player'

type AppProps = {
    history: HistoryType,
}

export function Editor({history}: AppProps) {
    const navigate = useNavigate();
    return (
        <HistoryContext.Provider value={history}>
            <TopPanel></TopPanel>
            <ToolBar navigate={navigate}></ToolBar>
            <div className={styles.container}>
                <SlidesList></SlidesList>
                <Workspace></Workspace>
            </div>
        </HistoryContext.Provider>
    )
}

export default function App({history}: AppProps) {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Editor history={history} />} />
                <Route path="/player" element={<Player />} />
            </Routes>
        </Router>
    )
}